import { Session } from "./types/Session";

export default function UserProfile({session}: {session: Session}) {
	
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h1 className="mb-4">Welcome {session.user}</h1>
					<div className="justify-end">
						<p>You've successfuly logged in!</p>
						<p>Your e-mail is: {session.email}</p>
					</div>
			</div>
		</div>
	);
}
