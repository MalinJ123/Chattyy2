// import { useLoaderData, Link } from "react-router-dom";
// import { getDb } from "../data/database.js";


import "../stylesheet/public.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import OpenChatt from "./OpenChat";
import image from '../images/fly.jpeg'

import { Link } from "react-router-dom";
// import DmMessages from "../routes/DmMessages";
//backend cant be used in react app.jsx
// import {getDb} from '../backend/data/database.js'
// const sessionStorageKey = "jsonWebTokenKEY";

function Public() {
	const [selectedChannel, setSelectedChannel] = useState(" ");
	const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
	const [newPublicMessage, setNewPublicMessage] = useState("");

	const handleSendMessage = () => {
		const message = document.querySelector('input[type="text"]').value;
		const chatHistory = document.querySelector(".history");

		if (message.trim() !== "") {
			const newMessage = document.createElement("section");
			newMessage.innerHTML = `
				  <section className="align-right">
						<p> VänligaVera: ${message} </p>
						<p> ${getCurrentTime()} </p>
				  </section>
			 `;
			chatHistory.appendChild(newMessage);
		}
		// Delete the input field
		document.querySelector('input[type="text"]').value = "";
	};

	const handleChannelClick = (channel) => {
		setSelectedChannel(channel);
		clearChatHistory();
	};

	const clearChatHistory = () => {
		const chatHistory = document.querySelector(".history");
		chatHistory.innerHTML = "";
	};

	//Jag har ingen login på den här sidan längre.
	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	//Time when message in public sent
	const getCurrentTime = () => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	return (
		<div>
			{isLoggedIn ? (
				<>
					<main>
						<nav>
							<ul>
								<li>[Inloggad]</li>
								<li>[Tillgängliga kanaler]</li>

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
									<a href="#">
										{" "}
										<Link to="/openchat">
											#Öppen chatt 
										</Link>{" "}
									</a>
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
								ENKEL CHAT APP
								<span className="chat-name"> #Byttefly</span>
							</section>
							<section className="history">
								<section className="align-right">
									<p>hej</p>
								</section>
							</section>
							<section>
								<input
									type="text"
									placeholder="Ditt meddelande..."
								/>
								<button>Skicka</button>
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
									<a href="#">
										{" "}
										<Link to="/openchat">
											#Öppen chatt 🔑
										</Link>{" "}
									</a>
								</li>

								<li className="locked">
									<a href="#"> #grupp1 🔒 </a>
								</li>
							</ul>
						</nav>
						<div className="chat-area">
							<section className="heading">
				
								<span className="chat-name">
									{selectedChannel}{" "}
								</span>
							</section>

							<section className="history">
								<section className="align-right">
									<p>  Välkommen till en enkel app </p>
									<p> 12:34 </p>
								</section>

								<img className ="background-Pic"src={image} alt="En bild på en fjäril" />
								<section>
									<p>Logga in för de bästa upplevelserna! </p>
									<p> 13:37 </p>
								</section>
							</section>
							<section>
								<input
									type="text"
									placeholder="Ditt meddelande..."
								/>
								<button onClick={handleSendMessage}>
									{" "}
									Skicka{" "}
								</button>
							</section>
							{/* <button onClick={handleLogin}>Logga in</button> */}
						</div>
					</main>
				</div>
			)}
		</div>
	);
}

export default Public;
