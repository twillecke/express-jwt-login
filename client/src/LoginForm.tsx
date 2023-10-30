import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
	onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [invalidAuth, setInvalidAuth] = useState(false);
	const navigate = useNavigate();

	function LoginClickHandler(e: { preventDefault: () => void; }) {
		e.preventDefault();
		const loginInputData = {
			username: formData.username,
			password: formData.password,
		};
		axios
			.post("http://localhost:3000/login", loginInputData)
			.then((response) => {
				if (response.status === 200) {
					console.log("Login successful");
					onLogin();
					navigate("/user-profile");
				} else if (response.status === 401) {
					console.log("Invalid username or password");
					setInvalidAuth(true);
				} else {
					console.log("Login failed");
					setInvalidAuth(true);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setInvalidAuth(true);
			});
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
