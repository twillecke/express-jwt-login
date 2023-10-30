type Session = {
	isLoggedIn: boolean;
	user: string;
  email: string;
};

export default function UserProfile({session}: {session: Session}) {
	
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h1 className="mb-4">Welcome {session.user}</h1>
					<div className="flex justify-end">
						<p>You've successfuly logged in!</p>
					</div>
			</div>
		</div>
	);
}
