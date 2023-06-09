import React, { useState, useEffect } from "react";
import fs from 'fs';

const dbFilePath = 'db.json';

const DmMessages = ({ username }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Läs innehållet från db.json när komponenten mountas
    readDB();
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const newMessage = messageInput.value;

    // Sparar meddelandet i databasen
    saveMessageToDB(newMessage);

    // Uppdatera state med de tidigare meddelandena plus det nya meddelandet
    setMessages([...messages, newMessage]);

    // Rensa inputfältet
    messageInput.value = "";
  };

  const readDB = () => {
    try {
      // Läs innehållet från db.json
      const dbContent = fs.readFileSync(dbFilePath, 'utf8');
      const db = JSON.parse(dbContent);

      // Uppdatera state med meddelandena från db.json
      setMessages(db.messages);
    } catch (error) {
      console.log('Ett fel inträffade vid läsning av db.json.', error);
    }
  };

  const saveMessageToDB = (message) => {
    try {
      // Läs innehållet från db.json
      const dbContent = fs.readFileSync(dbFilePath, 'utf8');
      const db = JSON.parse(dbContent);

      // Skapa det nya meddelandet
      const newMessage = {
        userId: 123, // Ersätt med rätt användar-ID
        message: message
      };

      // Lägg till det nya meddelandet i databasen
      db.messages.push(newMessage);

      console.log('Nytt meddelande skapat:', newMessage);

      // Skriv det uppdaterade innehållet till db.json
      fs.writeFileSync(dbFilePath, JSON.stringify(db));

      console.log('Meddelandet har sparats i db.json.');
    } catch (error) {
      console.log('Ett fel inträffade vid sparande av meddelandet i db.json.', error);
    }
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
          <form onSubmit={handleMessageSubmit}>
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
