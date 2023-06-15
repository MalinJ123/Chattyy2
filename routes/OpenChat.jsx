import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/contextRoot.jsx";
function OpenChat() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const { userId, setUserId } = useContext(UserContext);
	useEffect(() => {
		fetchMessages(); // Fetch messages from the API
	}, []);

	const fetchMessages = async () => {
		try {
			const response = await fetch("http://localhost:5173/api/messages");
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.log("Error fetching messages:", error);
		}
	};

	const handleMessageSubmit = (e) => {
		e.preventDefault();
		const messageInput = e.target.elements.message;
		const newMessage = messageInput.value;
		const messageId = Math.floor(Math.random() * 101);

		// Save the message in the database
		fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: newMessage,
				messageId: messageId,
				userId: userId || null,
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
						<section key={message.id}>
							<p>{message.message}</p>
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
