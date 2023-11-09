import { Session } from "./types/Session";

function UserProfile({ session, onLogOut }: { session: Session }) {
    const signupDate = new Date(session.signup_date);
    
    function handleLogOut () {
		const session = {
			isLoggedIn: false,
			user: "",
			email: "",
			user_id: "",
            signup_date:""
		};
        onLogOut(session);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-neutral-600 p-10 rounded-md">
                <h1 className="mb-4">Welcome {session.user}</h1>
                <div className="justify-end">
                    <p>You've successfully logged in!</p>
                    <br />
                    <p>Your email is: {session.email}</p>
                    <p>You're with us since: {signupDate.toLocaleDateString()}</p>
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
