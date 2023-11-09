import UserCredentials from "../domain/entity/UserCredentials";
const bcrypt = require("bcrypt");

class UserRegistrationService {
	db;

	constructor(database: any) {
		this.db = database; // Database connection
	}

	async execute(user: UserCredentials, res: any) {
		try {
			// Step 1: Check if the username already exists in "user_login_data"
			const existingUser = await this.db.oneOrNone(
				"SELECT username FROM thiago.user_login_data WHERE username = $1;",
				[user.username],
			);

			if (existingUser) {
				return res
					.status(409)
					.json({ error: "Username already exists" });
			}

			// Step 2: Insert user account information into the "user_account" table
			const userAccountQuery = `
        INSERT INTO thiago.user_account (name, lastname, email, signup_date)
        VALUES ($1, $2, $3, NOW())
        RETURNING user_id;
      `;

			const userAccountResult = await this.db.one(userAccountQuery, [
				user.name,
				user.lastname,
				user.email,
			]);

			// Retrieve the generated user_id
			const user_id = userAccountResult.user_id;

			// Step 3: Insert user login data into the "user_login_data" table with the obtained user_id
			const saltRounds = 10;
			const hashPassword = await bcrypt.hash(user.password, saltRounds);

			await this.db.query(
				"INSERT INTO thiago.user_login_data (user_id, username, hashpassword) VALUES ($1, $2, $3);",
				[user_id, user.username, hashPassword],
			);

			return res.status(201).json({ message: "User added successfully" });
		} catch (error) {
			console.error("Error:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

export default UserRegistrationService;
