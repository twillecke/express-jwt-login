import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

function UserProfile() {
	const [userReady, setUserReady] = useState(false);
	const [currentUser, setCurrentUser] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserProfileData = async () => {
			try {
				const currentUser = AuthService.getCurrentUser();
				if (!currentUser) {
					setUserReady(false);
					navigate("/login");
				} else {
					setCurrentUser(currentUser);
					setUserReady(true);

					const response = await UserService.getUserProfile(
						currentUser.user_id,
					);
					const data = response.data[0];
					setCurrentUser((prevUser) => ({ ...prevUser, ...data }));
				}
			} catch (error) {
				console.error("Error fetching user profile data:", error);
			}
		};

		fetchUserProfileData();
	}, [navigate]);

	function handleLogOut() {
		AuthService.logout();
		navigate("/login");
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h1 className="mb-4">Welcome {currentUser?.name}</h1>
				<div className="justify-end">
					<p>You've successfully logged in!</p>
					<br />
					<p>Your email is: {currentUser?.email}</p>
					<p>You're with us since: {currentUser?.signup_date}</p>
				</div>
				<button
					className="mt-6 rounded-md bg-slate-700 hover:bg-slate-800"
					onClick={handleLogOut}
				>
					Logout
				</button>
			</div>
		</div>
	);
}

export default UserProfile;
