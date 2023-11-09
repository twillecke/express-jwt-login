import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function LoginForm() {
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
			const response = await AuthService.login(loginInputData);

			if (response && response.accessToken) {
				console.log(response);

				navigate("/user-profile");
			} else {
				setInvalidAuth(true);
			}
		} catch (error) {
			console.error("Login Error:", error);
			setInvalidAuth(true);
		}
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
						className={`mb-1 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={(e) => handleInputChange(e, "password")}
					></input>
					{invalidAuth ? (
						<span className="text-sm text-red-500">
							*Invalid username and/or password
						</span>
					) : null}
					<div className="mt-4 flex justify-end">
						<a
							href="/sign-up"
							className="pt-2 text-zinc-300 hover:text-zinc-400"
						>
							Sign Up
						</a>
						<button
							className="pt-2 bg-slate-700 hover:bg-slate-800 ml-4 rounded-md	 focus:border-transparent hover:border-transparent"
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
