import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		emailAddress: "",
		username: "",
		password: "",
	});

	const [invalidAuth, setInvalidAuth] = useState(false);

	const navigate = useNavigate();

	const SignUpClickHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const registrationData = {
			name: formData.name,
			lastname: formData.lastName,
			email: formData.emailAddress,
			username: formData.username,
			password: formData.password,
		};

		try {
			const response = await axios.post(
				"http://localhost:3000/users",
				registrationData,
			);

			if (response.status === 201) {
				console.log("Registration successful");
				navigate("/login");
			} else {
				console.log("Registration failed");
				setInvalidAuth(true);
			}
		} catch (error) {
			console.error("Error:", error);
			setInvalidAuth(true);
		}
	};

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
				<h2 className="mb-4">Register Form</h2>
				<form onSubmit={SignUpClickHandler}>
					<div>
						<input
							name="name-input"
							className={`mb-3 mr-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Name"
							value={formData.name}
							onChange={(e) => handleInputChange(e, "name")}
						></input>
						<input
							name="last-name-input"
							className={`mb-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={(e) => handleInputChange(e, "lastName")}
						></input>
					</div>
					<input
						name="email-input"
						className={`mb-12 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="email"
						placeholder="E-mail Address"
						value={formData.emailAddress}
						onChange={(e) => handleInputChange(e, "emailAddress")}
					></input>
					<h2 className="mb-4">Login Data</h2>
					<input
						name="username-input"
						className={`mb-3 mr-3 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="text"
						placeholder="Username"
						value={formData.username}
						onChange={(e) => handleInputChange(e, "username")}
					></input>
					<input
						name="password-input"
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
							href="/login"
							className="pt-2 text-zinc-300 hover:text-zinc-400"
						>
							Login
						</a>
						<button
							className="pt-2 text-blue-400 hover:text-blue-500 focus:border-transparent hover:border-transparent"
							type="submit"
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
