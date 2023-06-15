import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../src/ContextRoot";
function OpenChat() {
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [channels, setChannels] = useState([]);
	const { currentChannelId, setCurrentChannelId } = useContext(UserContext);

	useEffect(() => {
		fetchChannels(); // Fetch channels from the API
		// fetchMessages(); // Fetch messages from the API
	}, []);

	const fetchChannels = async () => {
		try {
			const response = await fetch("http://localhost:5173/api/channels");
			const data = await response.json();

			setChannels(data);
		} catch (error) {
			console.log("Error fetching channels:", error);
		}
	};

	const handleChannelClick = async (channelId) => {
		try {
			const updatedChannels = channels.map((channel) => {
				if (channel.id === channelId) {
					return {
						...channel,
						isOpen: true,
					};
				} else {
					return {
						...channel,
						isOpen: false,
					};
				}
			});

			// Spara den uppdaterade kanallistan i databasen
			await fetch(`http://localhost:5173/api/channels`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedChannels),
			});
		} catch (error) {
			console.log("Error updating channel:", error);
		}
	};

	const generateMessageId = () => {
		const timestamp = Date.now().toString();
		const randomStr = Math.random().toString(36).substring(2, 10);

		return `${timestamp}+${randomStr}`;
	};

	const handleMessageSubmit = async (e) => {
		e.preventDefault();

		const newMessageData = {
			id: generateMessageId(),
			channelId: getCurrentChannelId(),
			message: newMessage,
			timestamp: getCurrentTime(),
		};
		console.log(newMessageData);
		try {
			// Spara meddelandet i databasen
			const response = await fetch("http://localhost:5173/api/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMessageData),
			});

			if (response.ok) {
				// Lägg till det nya meddelandet i state
				const data = await response.json();
				const messageWithTimestamp = {
					...data,
					timestamp: formatTimestamp(data.timestamp),
				};
				setMessages((prevMessages) => [
					...prevMessages,
					messageWithTimestamp,
				]);
				setNewMessage("");
			} else {
				console.log("Error saving message:", response.status);
			}
		} catch (error) {
			console.log("Error saving message:", error);
		}
	};

	// Funktion för att få aktuell tid
	const getCurrentTime = () => {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	const getCurrentChannelId = () => {
		return currentChannelId;
	};

	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Öppet Chattrum</p>
					<span className="chat-name"> </span>
				</section>

				<section className="history">
					{channels.map((channel) => (
						<li
							key={channel.id}
							className={
								channel.isOpen
									? "open-channel"
									: "closed-channel"
							}
							onClick={() => handleChannelClick(channel.id)}
						>
							{channel.name}
						</li>
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
