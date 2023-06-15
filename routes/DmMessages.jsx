import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/contextRoot";

const DmMessages = () => {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const { userId, setUserId } = useContext(UserContext);

	useEffect(() => {
		fetchMessages(); // Fetch meddelanden från API
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

		// Spara meddelandet i databasen
		fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userId,
				messageId: messageId,
				message: newMessage,
			}), // Anpassa userId för användaren som skriver meddelandet, Nu står 1 för admin
		})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				setMessages((prevMessages) => [...prevMessages, data]);
				// messageInput.value = '';
				// setNewMessage("");
			})
			.catch((error) => console.log(error));
	};

	const handleDeleteMessage = async (messageId) => {
		try {
			await fetch(`/api/messages/`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: userId, message: newMessage }),
			});
			// Uppdatera meddelandena i state efter borttagning
			setMessages((prevMessages) =>
				prevMessages.filter((message) => message.id !== messageId)
			);
		} catch (error) {
			console.log("Error deleting message:", error);
		}
	};

	//Time when message in public sent
	const getCurrentTime = () => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Skriver med {userId}</p>
					<span className="chat-name"> </span>
				</section>

				<section className="history">
					{messages.map((message) => (
						<section key={message.id}>
							<p>{message.message}</p>
							<p>{message.timestamp}</p>
							<button
								onClick={() => handleDeleteMessage(message.id)}
							>
								Delete
							</button>
						</section>
					))}

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
				</section>
			</div>
		</>
	);
};

export default DmMessages;
