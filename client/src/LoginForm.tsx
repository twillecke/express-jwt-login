type Session = {
	isLoggedIn: boolean;
	user: string;
	email: string;
};

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
	onLogin: (session: Session) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [invalidAuth, setInvalidAuth] = useState(false);
	const navigate = useNavigate();

	async function LoginClickHandler(e: React.FormEvent) {
		e.preventDefault();
		const loginInputData = {
			username: formData.username,
			password: formData.password,
		};

		try {
			const response = await axios.post(
				"http://localhost:3000/login",
				loginInputData,
			);

			if (response.status === 200) {
				console.log("Login successful");
				// Fetch user data or relevant information here and create a session object
				const userData = await fetchUserData(formData.username); // Adjust this according to your API
				const session = {
					isLoggedIn: true,
					user: userData.name,
					email: userData.email, // Include relevant user data
				};
				onLogin(session); // Pass the session object to the callback
				navigate("/user-profile");
			} else if (response.status === 401) {
				console.log("Invalid username or password");
				setInvalidAuth(true);
			} else {
				console.log("Login failed");
				setInvalidAuth(true);
			}
		} catch (error) {
			console.error("Error:", error);
			setInvalidAuth(true);
		}
	}

	async function fetchUserData(username: string) {
		const response = await axios.get(
			`http://localhost:3000/user/${username}`,
		);
		return response.data[0];
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		const value = e.target.value;
		setFormData({ ...formData, [field]: value });
		setInvalidAuth(false);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h2 className="mb-4">Login Form</h2>
				<form onSubmit={LoginClickHandler} className="flex flex-col">
					<input
						className={`mb-3 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="text"
						placeholder="Username"
						value={formData.username}
						onChange={(e) => handleInputChange(e, "username")}
					></input>
					<input
						className={`mb-3 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={(e) => handleInputChange(e, "password")}
					></input>
					<div className="flex justify-end">
						<a
							href="/sign-up"
							className="pt-2 text-zinc-300 hover:text-zinc-400"
						>
							Sign Up
						</a>
						<button
							className="pt-2 text-blue-400 hover:text-blue-500 focus:border-transparent hover:border-transparent"
							type="submit"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
