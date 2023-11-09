import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from 'react-router-dom';


function UserProfile() {
	const [userReady, setUserReady] = useState(false);
	const [currentUser, setCurrentUser] = useState({ username: "" });

    const navigate = useNavigate();

	useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
      
        if (!currentUser) {
          setUserReady(true);
          navigate("/login");
        } else {
          setCurrentUser(currentUser);
          setUserReady(true);
        }
      }, [navigate]);

	function handleLogOut() {
		AuthService.logout();
		navigate("/login");
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h1 className="mb-4">Welcome {currentUser.username}</h1>
				<div className="justify-end">
					<p>You've successfully logged in!</p>
					<br />
					{/* Replace these placeholders with actual user data */}
					<p>Your email is: {"email"}</p>
					<p>You're with us since: {"date"}</p>
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
