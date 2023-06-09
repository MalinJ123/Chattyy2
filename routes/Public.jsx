// import { useLoaderData, Link } from "react-router-dom";
// import { getDb } from "../data/database.js";

import "../stylesheet/public.css";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../src/ContextRoot";
//backend cant be used in react app.jsx
// import {getDb} from '../backend/data/database.js'

// const sessionStorageKey = "jsonWebTokenKEY";

function Public() {
	const [selectedChannel, setSelectedChannel] = useState(" ");
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);



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
  }
  
  const clearChatHistory = () => {
		const chatHistory = document.querySelector('.history');
		chatHistory.innerHTML = '';
  }
  
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
							<li>
								<a href="#">#koda</a>
							</li>
							<li>
								<a href="#">#random</a>{" "}
								<span className="unread logedin">3</span>{" "}
							</li>
							<li className="logedin">
								<a href="#">#grupp1 🔑</a>
							</li>
							<li className="logedin">
								<a href="#">#grupp2 🔑</a>
							</li>
							<li className="logedin">
								<a href="#">#grupp3 🔑</a>
							</li>
							<li>
								<hr />
							</li>
							<li title="Direktmeddelanden">[DM]</li>
							<li>
								<a href="#">PratgladPelle</a>
							</li>
							<li>
								<a href="#">SocialaSara</a>
							</li>
							<li>
								<a href="#">TrevligaTommy</a>
							</li>
							<li>
								<a href="#">VänligaVera</a>
							</li>
							<li>
								<a href="#">GladaGustav</a>
							</li>
						</ul>
					</nav>
					<div className="chat-area">
						<section className="heading">
							Chattar i
							<span className="chat-name">#grupp2</span>
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
		) : (<div>
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
								onClick={() => handleChannelClick("#koda")}
							>
								<a href="#"> #Koda 🔑 </a>
							</li>

							<li
								className={
									selectedChannel === "#unread"
										? "selected"
										: ""
								}
								onClick={() => handleChannelClick("#random")}
							>
								<a href="#"> #random  </a>
							</li>
							
							<li className="locked">
								<a href="#"> #grupp1 🔒 </a>
							</li>
							<li
								className={
									selectedChannel === "#grupp2"
										? "selected"
										: ""
								}
							>
								<a
									href="#"
									onClick={() =>
										setSelectedChannel("#grupp2")
									}
								>
									{" "}
									#grupp2 🔑{" "}
								</a>
							</li>

							<li className="locked">
								<a href="#"> #grupp3 🔒 </a>
							</li>
							<li>
								<hr />
							</li>
						</ul>
					</nav>
					<div className="chat-area">
						<section className="heading">
							Chattar i
							<span className="chat-name">
								{" "}
								{selectedChannel}{" "}
							</span>
						</section>

						<section className="history">
							<section className="align-right">
								<p> Anonym :D Hej! Hur mår ni idag </p>
								<p> 17:46 </p>
							</section>

							<section>
								<p> Anonym: tjena! </p>
								<p> 17:47 </p>
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
