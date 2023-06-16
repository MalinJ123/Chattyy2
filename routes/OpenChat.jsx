import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/ContextRoot.jsx";
function OpenChat() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const { userId, userName, currentChannelId} = useContext(UserContext);

	useEffect(() => {
		fetchMessages(); // Fetch messages from the API
	}, []);

	const fetchMessages = async () => {
		console.log(currentChannelId);
		try {
			const response = await fetch(
				`https://chatty-chat-app.onrender.com/api/messages?channel=${currentChannelId}`
			);
			const data = await response.json();
			const messages = data || [];
			setMessages(messages);
		} catch (error) {
			console.log("Error fetching messages:", error);
		}
	};

	const handleMessageSubmit = (e) => {
		e.preventDefault();
		const messageInput = e.target.elements.message;
		const newMessage = messageInput.value;
		const messageId = Math.floor(Math.random() * 10233124121);
		const timestamp = new Date().toLocaleString();
		// Save the message in the database
		fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: newMessage,
				messageId: messageId,
				userName: (userId !== null) ? userName : "Anonym",
				userId: (userId !== undefined) ? userId : 0,
				timestamp: timestamp,
				channelId: currentChannelId || null,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// Add the new message to the state
				setMessages((prevMessages) => [...prevMessages, data]);
				// Clear the input field
				setNewMessage("");
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Öppet Chattrum</p>
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

export default OpenChat;
