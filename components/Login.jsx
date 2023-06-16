import "./Login.css";

import { UserContext } from "../src/ContextRoot";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import loginUser from "../data/loginUser";

const LoginForm = () => {
	const { userName, setUserName } = useContext(UserContext);
	const [userPassword, setUserPassword] = useState("");

	// const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
	// const {setShowLoginForm} = useContext(LoginContext);
	const {
		sessionStorageKey,
		isLoggedIn,
		setIsLoggedIn,
		setShowLoginForm,
		setUserId,
	} = useContext(UserContext);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleClick = async () => {
		if (userName !== "" && userPassword !== "") {
			const loginStatus = await loginUser({
				name: userName,
				password: userPassword,
			});

			console.log(loginStatus.loggedIn);

			if (loginStatus.loggedIn == "Success") {
				let jwt = loginStatus.token;
				sessionStorage.setItem(sessionStorageKey, "Bearer: " + jwt);
				setIsLoggedIn(true);
				setUserId(loginStatus.id);
				setShowLoginForm(false);
			}
		} else {
			console.log("Gick inte att logga in!");
		}
	};

	const handleUserNameChange = (e) => {
		setUserName(e.target.value);
	};

	const handleUserPasswordChange = (e) => {
		setUserPassword(e.target.value);
	};
	const handleCloseLoginForm = () => {
		setShowLoginForm(false);
	};

	return (
		<>
			<form className="main-form" onSubmit={handleSubmit}>
				<div className="form-div">
					<div className="form-header">
						<h3 className="title">Butterfly's chat app</h3>
					</div>

					<div className="input-div">
						<label htmlFor="name">Användarnamn</label>
						<input
							id="name"
							type="text"
							value={userName}
							placeholder="admin"
							onChange={(e) => handleUserNameChange(e)}
						/>
					</div>

					<div className="input-div">
						<label htmlFor="password">Lösenord</label>
						<input
							id="password"
							type="password"
							placeholder="mums"
							value={userPassword}
							onChange={(e) => handleUserPasswordChange(e)}
						/>
					</div>

					<div className="login-div">
						<Link to="/public">
							<button
								onClick={handleClick}
								type="submit"
								className="login-btn"
							>
								Logga in
							</button>
						</Link>
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
