import {
	Route,
	Outlet,
	BrowserRouter,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistersForm";
import UserProfile from "./UserProfile";
import { useState } from "react";
import { Session } from "./types/Session";

const initialSession: Session = {
	isLoggedIn: false,
	user: "",
	email: "",
};

function App() {
	const [session, setSession] = useState(initialSession);

	const handleLogin = (newSession: Session) => {
		setSession(newSession);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route
						path="login"
						index
						element={<LoginForm onLogin={handleLogin} />}
					/>
					<Route path="sign-up" element={<RegisterForm />} />
					{session.isLoggedIn ? (
						<Route
							path="user-profile"
							element={<UserProfile session={session} />}
						/>
					) : (
						<Route
							path="user-profile"
							element={<Navigate to="/login" />}
						/>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
