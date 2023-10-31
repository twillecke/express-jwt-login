import express from "express";
import pgp from "pg-promise";
import cors from "cors";
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const PGP_CONNECTION =
	process.env.PGP_CONNECTION || "postgres://postgres:123@localhost:5444/app";

app.use(express.json());

const db = pgp()(PGP_CONNECTION);

app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE,OPTIONS",
		allowedHeaders:
			"Origin,X-Requested-With,Content-Type,Accept,Authorization",
	}),
);

app.get("/users", async (req, res) => {
	try {
		const data = await db.query("SELECT * FROM thiago.auth_user;", []);
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/users/:username", async (req, res) => {
	const { username } = req.params;
	try {
		const data = await db.query(
			"SELECT name, email FROM thiago.auth_user where username = $1;",
			[username],
		);
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/users", async (req, res) => {
	const { name, lastname, email, username, password } = req.body;

	if (
		name === "" ||
		lastname === "" ||
		email === "" ||
		username === "" ||
		password === ""
	) {
		return res.status(400).json({
			error: "Invalid data. Please provide all required fields.",
		});
	}

	try {
		const existingUser = await db.oneOrNone(
			"SELECT username FROM thiago.auth_user WHERE username = $1;",
			[username],
		);
		if (existingUser) {
			res.status(409).json({ error: "Username already exists" });
		} else {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			await db.query(
				"INSERT INTO thiago.auth_user (name, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5);",
				[name, lastname, email, username, hashedPassword],
			);
			res.status(201).json({ message: "User added successfully" });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await db.oneOrNone(
			"SELECT * FROM thiago.auth_user WHERE username = $1;",
			[username],
		);
		if (user) {
			const isPasswordValid = await bcrypt.compare(
				password,
				user.password,
			);
			if (isPasswordValid) {
				res.status(200).json({ message: "Login successful" });
			} else {
				res.status(401).json({ error: "Invalid username or password" });
			}
		} else {
			res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
