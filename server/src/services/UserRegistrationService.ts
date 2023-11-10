const bcrypt = require("bcrypt");
import UserCredentials from "../domain/entity/UserCredentials";

class UserRegistrationService {
	db;

	constructor(database: any) {
		this.db = database;
	}

	async execute(user: UserCredentials, res: any) {
		try {
			const existingUser = await this.db.oneOrNone(
				"SELECT username FROM thiago.user_login_data WHERE username = $1;",
				[user.username],
			);

			if (existingUser) {
				return res
					.status(409)
					.json({ error: "Username already exists" });
			}

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

			const user_id = userAccountResult.user_id;

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
