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
		const data = await db.query(
			"SELECT * FROM thiago.user_login_data;",
			[],
		);
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/users/:user_id", async (req, res) => {
	const { user_id } = req.params;
	try {
		const data = await db.query(
			"SELECT * FROM thiago.user_account where user_id = $1;",
			[user_id],
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
		// Step 1: Check if the username already exists in "user_login_data"
		const existingUser = await db.oneOrNone(
			"SELECT username FROM thiago.user_login_data WHERE username = $1;",
			[username],
		);

		if (existingUser) {
			res.status(409).json({ error: "Username already exists" });
		} else {
			// Step 2: Insert user account information into the "user_account" table
			const userAccountQuery = `
                INSERT INTO thiago.user_account (name, lastname, email)
                VALUES ($1, $2, $3)
                RETURNING user_id;
            `;

			const userAccountResult = await db.one(userAccountQuery, [
				name,
				lastname,
				email,
			]);

			// Retrieve the generated user_id
			const user_id = userAccountResult.user_id;

			// Step 3: Insert user login data into the "user_login_data" table with the obtained user_id
			const saltRounds = 10;
			const hashPassword = await bcrypt.hash(password, saltRounds);

			await db.query(
				"INSERT INTO thiago.user_login_data (user_id, username, hashpassword) VALUES ($1, $2, $3);",
				[user_id, username, hashPassword],
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
			"SELECT user_id, username, hashpassword FROM thiago.user_login_data WHERE username = $1;",
			[username],
		);
		if (user) {
			const isPasswordValid = await bcrypt.compare(
				password,
				user.hashpassword,
			);
			if (isPasswordValid) {
				res.status(200).json({
					message: "Login successful",
					user_id: user.user_id,
				});
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
