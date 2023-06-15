//backend cant be used in react app.jsx
// import { useLoaderData, Link } from "react-router-dom";
// import { getDb } from "../data/database.js";

import "../stylesheet/public.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import image from "../images/fly.jpeg";

import { Link } from "react-router-dom";

function Public({}) {
	const [selectedChannel, setSelectedChannel] = useState("");
	const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
	const { currentChannelId, setCurrentChannelId } = useContext(UserContext);
	const [newPublicMessage, setNewPublicMessage] = useState("");
	const { channels, setChannels } = useContext(UserContext);

	const handleChannelClick = (channel) => {
		setSelectedChannel(channel);
		setCurrentChannelId(channel);
	};

	// const getChannels = async () => {
	// 	try {

	// 		await fetch(`http://localhost:5173/api/channels`, {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(updatedChannels),
	// 		}
	// 		setChannels(updatedChannels);}
	// 	} catch (error) {
	// 		console.log("Error updating channel:", error);
	// 	}
	// };
	// useEffect(() => {getChannels()}, [])

	return (
		<div>
			{isLoggedIn ? (
				<>
					<main>
						<nav>
							<ul>
								<li>[Inloggad]</li>
								<li>[Tillgängliga kanaler]</li>

								<li>
									<Link to="/openchat">#Öppen chatt 🔑</Link>
								</li>
								<li className="logedin">
									<Link to="/unlocked">#grupp1🔑</Link>
								</li>
								<li>
									<hr />
								</li>
								<li title="Direktmeddelanden">[DM]</li>
								<li>
									<Link to="/messages">PratgladPelle</Link>
								</li>
							</ul>
						</nav>
						<div className="chat-area">
							<section className="heading">
								<img
									className="background-Pic"
									src={image}
									alt="En bild på en fjäril"
								/>
							</section>
						</div>
					</main>
				</>
			) : (
				<div>
					<main>
						<nav>
							<ul>
								<li> [ EJ inloggad ] </li>
								<li> [Tillgängliga kanaler] </li>
								<li
									className={
										selectedChannel === "#koda"
											? "selected"
											: ""
									}
									onClick={() =>
										handleChannelClick("#Öppen chatt")
									}
								>
									<Link to="/openchat">#Öppen chatt 🔑</Link>
								</li>

								<li className="locked">
									<a href="#"> #grupp1 🔒 </a>
								</li>
							</ul>
						</nav>

						<section className="heading">
							<img
								className="background-Pic"
								src={image}
								alt="En bild på en fjäril"
							/>
						</section>
					</main>
				</div>
			)}
		</div>
	);
}

export default Public;
