import express from "express";
import pgp from "pg-promise";
import cors from "cors";
import UserCredentials from "./domain/entity/UserCredentials";
import UserRegistrationService from "./services/UserRegistrationService";
const bcrypt = require("bcrypt");
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import verifyToken from "./middlewares/authMiddleware";
import UserAuthenticationService from "./services/UserAuthenticationService";

dotenv.config();
const PORT = process.env.PORT || 3000;
const PGP_CONNECTION = "postgres://postgres:123@localhost:5444/app";

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
const userAuthService = new UserAuthenticationService(db);

app.get("/api/v1/users", async (req, res) => {
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

app.get("/api/v1/users/:user_id", verifyToken, async (req, res) => {
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

app.post("/api/v1/users", async (req, res) => {
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

app.post("/api/v1/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const authResult = await userAuthService.execute(username, password);

		if (authResult.success) {
			res.status(200).json(authResult);
		} else {
			res.status(401).json({ error: authResult.error });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/v1/logout", function (req, res) {
	res.json({ auth: false, token: null });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
