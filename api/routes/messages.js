import express from "express";
import { getDb } from "../data/database.js";


const router = express.Router();
const db = getDb()


//GET /messages
//GET /messages by id
//DEletes messages all
//DELETE messages by id

//POST /messages




//GET /api/messages -> all messages 
router.get('/', async (req, res) => {
	try {
		await db.read();
		const messages = db.data.channels.messages;

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
		const { userId, message, messageId } = req.body;

		await db.read();

		// Skapa det nya meddelandet
		const newMessage = {
			userId: userId,
			message: message,
			messageId: messageId,
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

export default router;