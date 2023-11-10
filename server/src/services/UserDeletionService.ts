class UserDeletionService {
	private db: any;

	constructor(readonly database: any) {
		this.db = database;
	}

	async deleteUserById(user_id: string) {
		try {
			await this.db.query(
				"DELETE FROM thiago.user_login_data WHERE user_id = $1;",
				[user_id],
			);

			const result = await this.db.query(
				"DELETE FROM thiago.user_account WHERE user_id = $1 RETURNING *;",
				[user_id],
			);

			return result;
		} catch (error) {
			console.error("Error:", error);
			throw new Error("Internal Server Error");
		}
	}
}

export default UserDeletionService;
