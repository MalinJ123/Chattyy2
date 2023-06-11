
import React, { useState, useEffect } from "react";


const DmMessages = ({ username }) => {
  const [messages, setMessages] = useState([]);
  
	return (
		<>
			<div className="chat-area">
				<section className="heading">
					<p>Skriver med {username}</p>
					<span className="chat-name"> </span>
				</section>

				<section className="history">
					{messages.map((message, index) => (
						<section key={index}>
							<p>{message}</p>
							<p>17:47</p>
						</section>
					))}
				</section>
				<section>
          <form>
					{/* <form onSubmit={handleMessageSubmit}> */}
						<input
							type="text"
							name="message"
							placeholder="Ditt meddelande..."
						/>
						<button type="submit">Skicka</button>
					</form>
				</section>
			</div>
		</>
	);
};

export default DmMessages;
