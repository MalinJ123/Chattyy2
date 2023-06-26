import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/contextRoot.jsx";

function Unlocked() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const userContext = useContext(UserContext);
	const { userId, userName, currentChannelId, sessionStorageKey } =
		userContext;

	useEffect(() => {
		fetchMessages(); 
	}, []);

	const fetchMessages = async () => {
		try {
			const tokenWithBearer = sessionStorage.getItem(sessionStorageKey);
			const token = tokenWithBearer.split(" ")[1];
			console.log(token);
			const response = await fetch(
				`http://localhost:5173/api/messages?channel=${currentChannelId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const fetchData = await response.json();
			console.log(fetchData);
			const messages = fetchData || [];

			setMessages(messages);
		} catch (error) {
			console.log("Error fetching messages:", error);
		}
	};

	const handleMessageSubmit = (e) => {
		e.preventDefault();
		const messageInput = e.target.elements.message;
		const newMessage = messageInput.value;
		const messageId = Math.floor(Math.random() * 101);
		const timestamp = new Date().toLocaleString();
		const token = sessionStorage.getItem(sessionStorageKey);

		// Save the message in the database
		if (currentChannelId === 2 && token !== null) {
			fetch("/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					message: newMessage,
					messageId: messageId,
					userId: userId || null,
					userName: userId !== null ? userName : "Anonym",
					timestamp: timestamp,
					channelId: currentChannelId || null,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					setMessages((prevMessages) => [...prevMessages, data]);
					setNewMessage("");
				})
				.catch((error) => console.log(error));
		} else {
			alert("Not Authorized");
		}
	};
	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Endast för användare Chattrum</p>
					<span className="chat-name"> </span>
				</section>

				<section className="history">
					{messages.map((message) => (
						<section key={message.messageId}>
							<p>{message.message}</p>
							<p>{message.userName}</p>
							<p>{message.timestamp}</p>
						</section>
					))}
				</section>

				<form onSubmit={handleMessageSubmit}>
					<input
						type="text"
						name="message"
						placeholder="Ditt meddelande..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<button type="submit">Skicka</button>
				</form>
			</div>
		</>
	);
}

export default Unlocked;