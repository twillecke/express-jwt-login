import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3000/api/v1/";

class UserService {
	getPublicContent() {
		return axios.get(API_URL + "all");
	}

	getUserProfile(idUser: string) {
		return axios.get(API_URL + `users/${idUser}`, { headers: authHeader() });
	}

	deleteUserProfile(idUser: string) {
		return axios.delete(API_URL + `users/${idUser}`, { headers: authHeader() });
	}

	getModeratorBoard() {
		return axios.get(API_URL + "mod", { headers: authHeader() });
	}

	getAdminBoard() {
		return axios.get(API_URL + "admin", { headers: authHeader() });
	}
}

export default new UserService();
