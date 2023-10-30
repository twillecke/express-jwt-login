import { ChangeEvent, useState } from "react";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		emailAddress: "",
		username: "",
		password: "",
	});

	function SignUpClickHandler() {
		const loginInputData = {
			name: formData.name,
			lastName: formData.lastName,
			emailAddress: formData.emailAddress,
			username: formData.username,
			password: formData.password,
		};
		console.log(loginInputData);
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
				<h2 className="mb-4">Register Form</h2>
				<form className="flex flex-col">
					<div>
					<input
						name="name-input"
						className="mb-3 mr-3 p-3 rounded-md"
						type="text"
						placeholder="Name"
						value={formData.name}
						onChange={(e) => handleInputChange(e, "name")}
					></input>
					<input
						name="last-name-input"
						className="mb-3 p-3 rounded-md"
						type="text"
						placeholder="Last Name"
						value={formData.lastName}
						onChange={(e) => handleInputChange(e, "lastName")}
					></input>
					</div>
					<input
						name="email-input"
						className="mb-12 p-3 rounded-md"
						type="text"
						placeholder="E-mail Address"
						value={formData.emailAddress}
						onChange={(e) => handleInputChange(e, "emailAddress")}
					></input>
					<input
						name="username-input"
						className="mb-3 p-3 rounded-md"
						type="text"
						placeholder="Username"
						value={formData.username}
						onChange={(e) => handleInputChange(e, "username")}
					></input>
					<input
						name="password-input"
						className="mb-3 p-3 rounded-md"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={(e) => handleInputChange(e, "password")}
					></input>
					<div className="flex justify-end">
						<a
							href="login"
							className="pt-2 text-zinc-300 hover:text-zinc-400"
						>
							Login
						</a>
						<button
							onClick={SignUpClickHandler}
							className="pt-2 text-blue-400 hover:text-blue-500 focus:border-transparent hover:border-transparent"
							type="button"
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
