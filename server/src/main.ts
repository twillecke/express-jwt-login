import express from "express";
import pgp from "pg-promise";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = pgp()("postgres://postgres:123@localhost:5444/app");

app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE,OPTIONS",
		allowedHeaders:
			"Origin,X-Requested-With,Content-Type,Accept,Authorization",
	}),
);

app.get("/user", async (req, res) => {
	try {
		const data = await db.query("SELECT * FROM thiago.auth_user;", []);
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/user", async (req, res) => {
	const {name, lastname, email, username, password } = req.body;

	try {
		const existingUser = await db.oneOrNone(
			"SELECT username FROM thiago.auth_user WHERE username = $1;",
			[username],
		);
		if (existingUser) {
			res.status(409).json({ error: "Username already exists" });
		} else {
			await db.query(
				"INSERT INTO thiago.auth_user (name, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5);",
				[name, lastname, email, username, password],
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
			"SELECT * FROM thiago.auth_user WHERE username = $1 AND password = $2;",
			[username, password],
		);

		if (user) {
			res.status(200).json({ message: "Login successful" });
		} else {
			res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
