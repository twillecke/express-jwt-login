export default class UserCredentials {
    constructor(
        readonly name: string,
        readonly lastname: string,
        readonly email: string,
        readonly username: string,
        readonly password: string,
    ) {
        if (!name) throw new Error("Name cannot be null or undefined");
        if (!lastname) throw new Error("Last name cannot be null or undefined");
        if (!email || !this.isValidEmail(email)) throw new Error("Invalid email format");
        if (!username) throw new Error("Username cannot be null or undefined");
        if (!password) throw new Error("Password cannot be null or undefined");
    }

    private isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }
}
