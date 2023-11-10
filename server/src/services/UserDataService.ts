class UserDataService {
    private db: any;

    constructor( readonly database: any) {
        this.db = database;
    }

    async getAllUsers() {
        try {
            const data = await this.db.query(
                "SELECT user_id, name, lastname, email, signup_date FROM thiago.user_account;",
                []
            );
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Internal Server Error");
        }
    }

    async getUserById(user_id: string) {
        try {
            const data = await this.db.query(
                "SELECT * FROM thiago.user_account WHERE user_id = $1;",
                [user_id]
            );
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error("Internal Server Error");
        }
    }
}

export default UserDataService;
