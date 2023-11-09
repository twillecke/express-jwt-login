export default class UserCredentials {
	constructor(
		readonly name: string,
		readonly lastname: string,
		readonly email: string,
        readonly username: string,
        readonly password: string,
	) {
        if (name === "") throw new Error("Name is required");
        if (lastname === "") throw new Error("Last name is required");
        if (email === "") throw new Error("Email is required");
        if (username === "") throw new Error("Username is required");
        if (password === "") throw new Error("Password is required");
    }
}
