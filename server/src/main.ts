import express from "express";
import pgp from "pg-promise";
import cors from "cors";
import UserCredentials from "./domain/entity/UserCredentials";
import UserRegistrationService from "./services/UserRegistrationService";
const bcrypt = require("bcrypt");
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const PORT = process.env.PORT || 3000;
const PGP_CONNECTION =
	process.env.PGP_CONNECTION || "postgres://postgres:123@localhost:5444/app";

const app = express();
app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE,OPTIONS",
		allowedHeaders:
			"Origin,X-Requested-With,Content-Type,Accept,Authorization",
	}),
);
app.use(express.json());

const db = pgp()(PGP_CONNECTION);
const userRegistrationService = new UserRegistrationService(db);

app.get("/users", async (req, res) => {
	try {
		const data = await db.query(
			"SELECT user_id, name, lastname, email, signup_date FROM thiago.user_account;",
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
	try {
		const user = new UserCredentials(
			name,
			lastname,
			email,
			username,
			password,
		);
		userRegistrationService.execute(user, res);
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
				const secret = process.env.SECRET as string;
				const accessToken = jwt.sign(
					{ user_id: user.user_id, username: user.username },
					secret,
					{ expiresIn: 300 },
				);

				res.status(200).json({
					message: "Login successful",
					auth: true,
					user_id: user.user_id,
					accessToken: accessToken,
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

app.post("/logout", function (req, res) {
	res.json({ auth: false, token: null });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
