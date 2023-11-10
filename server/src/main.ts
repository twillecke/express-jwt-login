import express from "express";
import pgp from "pg-promise";
import cors from "cors";
import UserCredentials from "./domain/entity/UserCredentials";
import UserRegistrationService from "./services/UserRegistrationService";
import dotenv from "dotenv";
import verifyToken from "./middlewares/authorizationMiddleware";
import UserAuthenticationService from "./services/UserAuthenticationService";
import UserDataService from "./services/UserDataService";
import UserDeletionService from "./services/UserDeletionService";

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
const userDataService = new UserDataService(db);
const userDeletionService = new UserDeletionService(db);

app.get("/api/v1/users", async (req, res) => {
	try {
		const data = await userDataService.getAllUsers();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
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

app.get("/api/v1/users/:user_id", verifyToken, async (req, res) => {
	const { user_id } = req.params;
	try {
		const data = await userDataService.getUserById(user_id);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
});

app.delete("/api/v1/users/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const deletedUser = await userDeletionService.deleteUserById(user_id);

        if (deletedUser) {
            res.json({ message: "User deleted successfully", user: deletedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
