import React, { useState, useEffect } from "react";
import { getDb } from "../api/data/db.json";

const DmMessages = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const db = getDb();

  useEffect(() => {
    // Läs in meddelandena från databasen när komponenten mountas
    const messages = db.get("messages").value();
    setMessages(messages);
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const newMessage = messageInput.value;

    // Sparar meddelandet i databasen
    db.get("messages")
      .push({ userId: '' , message: newMessage })
      .write();

    setMessages([...messages, newMessage]);

    // Rensa inputfältet
    messageInput.value = "";
  };

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
