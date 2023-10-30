import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function LoginForm() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	function LoginClickHandler() {
		const loginInputData = {
			username: formData.username,
			password: formData.password,
		};
		axios
			.post("http://localhost:3000/login", loginInputData)
			.then((response) => {
				if (response.status === 200) {
					console.log("Login successful");
				} else if (response.status === 401) {
					console.log("Invalid username or password");
				} else {
					console.log("Login failed");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		const value = e.target.value;
		setFormData({ ...formData, [field]: value });
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h2 className="mb-4">Login Form</h2>
				<form className="flex flex-col">
					<input
						className="mb-3 p-3 rounded-md"
						type="text"
						placeholder="Username"
						value={formData.username}
						onChange={(e) => handleInputChange(e, "username")}
					></input>
					<input
						className="mb-3 p-3 rounded-md"
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
							onClick={LoginClickHandler}
							className="pt-2 text-blue-400 hover:text-blue-500 focus:border-transparent hover:border-transparent"
							type="button"
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
