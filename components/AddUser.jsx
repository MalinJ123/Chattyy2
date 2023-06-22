import { addUser } from "../data/addUser";
import { useState } from "react";

const PostUser = () => {
	const [user, setUser] = useState({
		name: "",
		password: "",
	});

	function generateRandomId() {
		const timestamp = new Date().getTime();
		const randomId = `${timestamp}${Math.random()}`;
		return randomId;
	}

	async function handleProduct(e) {
		e.preventDefault();

		const userId = generateRandomId();
		const userDetails = {
			name: user.name,
			password: user.password,
			id: userId,
		};
		console.log("skickar detta till api", userDetails);
		try {
			const result = await addUser(userDetails);
			if (result) {
				console.log("uppdateringen lyckades");
			} else {
				console.log("något blev fel");
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<section>
			<form onSubmit={handleProduct} className="update-form">
				<div className="update-form-div">
					<h1>Lägg till användare</h1>

					<div className="update-input-div">
						<label htmlFor="user-name"> Namn: </label>
						<input
							id="user-name"
							type="text"
							placeholder="Namn"
							onChange={(e) =>
								setUser({ ...user, name: e.target.value })
							}
						/>
					</div>

					<div className="update-input-div">
						<label htmlFor="user-password">Lösenord: </label>
						<input
							id="user-password"
							type="password"
							placeholder="Lösenord"
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
						/>
					</div>

					<button className="edit-btn" type="submit">
						Lägg till användare
					</button>
				</div>
			</form>
		</section>
	);
};

export default PostUser;
