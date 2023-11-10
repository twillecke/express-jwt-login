const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

class UserAuthenticationService {
	db;

	constructor(database: any) {
		this.db = database;
	}

	async execute(username: string, password: string) {
		try {
			const user = await this.db.oneOrNone(
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
					const expirationTime = 5;
					const accessToken = jwt.sign(
						{ user_id: user.user_id, username: user.username },
						secret,
						{ expiresIn: expirationTime },
					);

					return {
						success: true,
						message: "Login successful",
						auth: true,
						user_id: user.user_id,
						accessToken: accessToken,
					};
				} else {
					return {
						success: false,
						error: "Invalid username or password",
					};
				}
			} else {
				return {
					success: false,
					error: "Invalid username or password",
				};
			}
		} catch (error) {
			console.error("Error:", error);
			return { success: false, error: "Internal Server Error" };
		}
	}
}

export default UserAuthenticationService;
