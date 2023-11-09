import axios from "axios";

test("API should return an array of users with the correct structure", async () => {
	try {
		const response = await axios.get("http://localhost:3000/users");
		const data = response.data;

		expect(Array.isArray(data)).toBe(true);

		data.forEach((user: any) => {
			expect(user).toHaveProperty("user_id");
			expect(user).toHaveProperty("name");
			expect(user).toHaveProperty("lastname");
			expect(user).toHaveProperty("email");
			expect(user).toHaveProperty("signup_date");
		});
	} catch (error) {
		throw error;
	}
});

test("API should return user with the correct structure", async () => {
	try {
		const response = await axios.get("http://localhost:3000/users/1");
		const data = response.data;

		expect(Array.isArray(data)).toBe(true);

		data.forEach((user: any) => {
			expect(user).toHaveProperty("user_id");
			expect(user).toHaveProperty("name");
			expect(user).toHaveProperty("lastname");
			expect(user).toHaveProperty("email");
			expect(user).toHaveProperty("signup_date");
		});
	} catch (error) {
		throw error;
	}
});

test("Create a user via POST request", async () => {
	const createUserUrl = 'http://localhost:3000/users';
	const userData = {
		name: "gavin",
		lastname: "Hoe",
		email: "gavin@example.com",
		username: "gavin",
		password: "securepassword",
	};

	try {
		const response = await axios.post(createUserUrl, userData);

		expect(response.status).toBe(201);
		expect(response.data).toEqual({ message: "User added successfully" });
		
	} catch (error) {
		throw error;
	}
});
