import React, { useState, useEffect } from "react";

const DmMessages = ({ username }) => {
	const [messages, setMessages] = useState([]);
 const [newMessage, setNewMessage] = useState("");

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

		// Spara meddelandet i databasen
		fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: "", message: newMessage }), // Anpassa userId för användaren som skriver meddelandet, Nu står 1 för admin 

		})
    .then((response) => {
      console.log(response); // Log the response data here
      return response.json();
    })
    .then((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      messageInput.value = ""; 
    })
    .catch((error) => console.log(error));
};

		// 	.then((response) => response.json())
		// 	.then((data) => {
		//       // Lägg till det nya meddelandet i listan
    //       setMessages((prevMessages) => [...prevMessages, data]);

    //       messageInput.value = ""; 
    //     })
    //     .catch((error) => console.log(error));
    // };

	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Skriver med {username}</p>
					<span className="chat-name"> </span>
				</section>

			  <section className="history">
          {messages.map((message) => (
              <section key={message.id}>
                <p>{message.message}</p>
                {/* <p>{message.timestamp}</p> */}
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
