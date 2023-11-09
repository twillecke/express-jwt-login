import jwt from "jsonwebtoken";

const verifyToken = (req: any, res: any, next: any) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ error: "Unauthorized: No token provided" });
	}

	const secret = "123";

	jwt.verify(token, secret, (err: any, decoded: any) => {
		if (err) {
			return res
				.status(401)
				.json({ error: "Unauthorized: Invalid token" });
		}

		req.user = decoded;
		next();
	});
};

export default verifyToken;
