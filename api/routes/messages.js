import express from "express";
import { getDb } from "../data/database.js";


const router = express.Router();
const db = getDb()


//GET /messages
//GET /messages by id
//DELETE messages by id
//DEletes messages all
//POST /messages
//PUT /messages by id




//GET /api/messages -> all messages 
router.get('/', async (req, res) => {
	try {
		await db.read();
		const messages = db.data.messages;
		
		// console.log("Visar messages-lista", messages);
		res.send(messages);
  } catch (error) {
		console.log("Detta är vad vi får tillbaka ifrån meddelande listan", error);
		res.status(500).send("Ett fel inträffade med att hämta meddelandena.");
  }
});

// GET /api/messages/:userId 
router.get('/:userId', async (req, res) => {
	try {
	  const userId = parseInt(req.params.userId);
	  
	  await db.read();
	  const messages = db.data.messages.filter(
		 (message) => message.userId === userId
	  );
 
	  if (messages.length === 0) {
		 console.log("Inga meddelanden hittades för användar-ID", userId);
	  }

	  const messagesWithUser = messages.map((message) => {
      const user = db.data.users.find((user) => user.id === message.userId);
      return {
        userId: message.userId,
        userName: user ? user.name : "Okänd användare",
        message: message.message,
      };
    });
	  
	  console.log("Meddelanden med användare:", messagesWithUser);
	  
	  res.send(messagesWithUser);
	} catch (error) {
	  console.log("Ett fel inträffade med att hämta meddelandena", error);
	  res.status(500).send("Ett fel inträffade med att hämta meddelandena.");
	}
 });
 
 //DELETE /messages with user id 
 router.delete('/:userId', async (req, res) => {
	try {
	  const userId = parseInt(req.params.userId);
	  
	  await db.read();
	  
	  // Ta bort meddelanden för användar-ID
	  db.data.messages = db.data.messages.filter(message => message.userId !== userId);
	  
	  console.log("Meddelanden för användar-ID", userId, "har tagits bort");
	  
	  await db.write();
	  
	  res.status(200).send("Meddelanden har tagits bort för användar-ID " + userId);
	} catch (error) {
	  console.log("Ett fel inträffade med att ta bort meddelanden", error);
	  res.status(500).send("Ett fel inträffade med att ta bort meddelanden.");
	}
 });

 //DELETE /messages all messages 
 router.delete('/', async (req, res) => {
	try {
	  await db.read();
	  
	  // Töm meddelandena i databasen
	  db.data.messages = [];
	  
	  console.log("Alla meddelanden har tagits bort");
	  
	  await db.write();
	  
	  res.status(200).send("Alla meddelanden har tagits bort");
	} catch (error) {
	  console.log("Ett fel inträffade med att ta bort meddelanden", error);
	  res.status(500).send("Ett fel inträffade med att ta bort meddelanden.");
	}
 });
 
// POST /messages
router.post('/', async (req, res) => {
	try {
	  const { userId, message,  timestamp  } = req.body;
 
	  await db.read();
 
	   // Skapa det nya meddelandet med aktuell tid
		const newMessage = {
			userId: userId,
			message: message,
			timestamp: timestamp, // Set the timestamp to the current time
		 };
 
	  // Lägg till det nya meddelandet i databasen
	  db.data.messages.push(newMessage);
 
	  console.log('Nytt meddelande skapat:', newMessage);
 
	  await db.write();
 
	  res.status(201).send('Nytt meddelande har skapats');
	} catch (error) {
	  console.log('Ett fel inträffade med att skapa meddelandet', error);
	  res.status(500).send('Ett fel inträffade med att skapa meddelandet.');
	}
 });




// PUT /messages/:messageId
router.put('/:messageId', async (req, res) => {
	try {
	  const messageId = parseInt(req.params.messageId);
	  const { userId, message, timestamp } = req.body;
 
	  await db.read();
 
	  const index = db.data.messages.findIndex((message) => message.messageId === messageId);
 
	  if (index === -1) {
		 console.log("Meddelande med ID", messageId, "hittades inte");
		 res.status(404).send("Meddelandet hittades inte");
		 return;
	  }
 
	  // Uppdatera meddelandet med nya uppgifter
	  db.data.messages[index] = {
		 userId: userId,
		 message: message,
		 timestamp: timestamp,
	  };
 
	  console.log("Meddelande med ID", messageId, "har uppdaterats:", db.data.messages[index]);
 
	  await db.write();
 
	  res.status(200).send("Meddelandet har uppdaterats");
	} catch (error) {
	  console.log("Ett fel inträffade med att uppdatera meddelandet", error);
	  res.status(500).send("Ett fel inträffade med att uppdatera meddelandet.");
	}
 });
 




 
 export default router;