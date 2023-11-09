import axios from "axios";

const API_URL = "http://localhost:3000/";

class AuthService {
	login({ username, password }: { username: string; password: string }) {
		return axios
			.post(API_URL + "login", {
				username,
				password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				return response.data;
			})
			.catch((error) => {
				console.error("Login Error:", error);
				throw error; // Rethrow the error to propagate it to the caller
			});
	}

	logout() {
		localStorage.removeItem("user"); // Remove the "user" item instead of "logout"
	}

	register(loginInputData: {
		name: string;
		lastname: string;
		email: string;
		username: string;
		password: string;
	}) {
		return axios
			.post(API_URL + "users", {
				name: loginInputData.name,
				lastname: loginInputData.lastname,
				email: loginInputData.email,
				username: loginInputData.username,
				password: loginInputData.password,
			})
			.catch((error) => {
				console.error("Registration Error:", error);
				throw error; // Rethrow the error to propagate it to the caller
			});
	}

	getCurrentUser() {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	}
}

export default new AuthService();
