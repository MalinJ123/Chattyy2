import express from "express";
import { getDb } from "../data/database.js";
import jwt from 'jsonwebtoken';
import SECRET from '../../server.js'
const router = express.Router();
const db = getDb()


router.get('/', async (req, res) => {
	try {
		const currentChannel = parseInt(req.query.channel);
		console.log('Current channel ID:', currentChannel);

		await db.read();
		const channel = db.data.channels.find((channel) => channel.id === currentChannel);
		console.log('Found channel:', channel);

		if (!channel) {
			console.log('Channel not found');
			return res.status(404).send({ message: 'Channel not found.' });
		}

		if (currentChannel === 2) {
			const token = req.headers.authorization?.split(' ')[1];
			console.log('Received token:', token);

			if (!token) {
				console.log('Token not found');
				return res.status(401).send({ message: 'Unauthorized. Token not found.' });
			}

			// Verify the JWT token
			try {
				const decodedToken = jwt.verify(token, SECRET);
				console.log('Decoded token:', decodedToken);
			} catch (err) {
				console.error('Error decoding token:', err);
				return res.status(500).send({ message: 'Error decoding token.' });
			}
		}

		const messages = channel.messages || [];
		console.log('Retrieved messages:', messages);

		res.send(messages);
	} catch (error) {
		console.log('Error retrieving messages:', error);
		res.status(500).send('An error occurred while fetching the messages.');
	}
});

// GET /api/messages/:userId 
router.get('/:userId', async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).send({ message: 'Unauthorized. Token not found.' });
		}

		const decodedToken = jwt.verify(token, SECRET);

		// Get the user ID from the decoded token
		const userId = parseInt(req.params.userId);

		if (decodedToken.userId !== userId) {
			return res.status(401).send({ message: 'Unauthorized. Invalid user ID.' });
		}

		await db.read();
		const messages = db.data.messages.filter((message) => message.userId === userId);

		if (messages.length === 0) {
			console.log('Inga meddelanden hittades för användar-ID', userId);
		}

		const messagesWithUser = messages.map((message) => {
			const user = db.data.users.find((user) => user.id === message.userId);
			return {
				userId: message.userId,
				userName: user ? user.name : 'Okänd användare',
				message: message.message,
			};
		});

		console.log('Meddelanden med användare:', messagesWithUser);

		res.send(messagesWithUser);
	} catch (error) {
		console.log('Ett fel inträffade med att hämta meddelandena', error);
		res.status(500).send('Ett fel inträffade med att hämta meddelandena.');
	}
});



router.delete('/', async (req, res) => {
	try {
		await db.read(); 

		const currentChannel = parseInt(req.query.channel);
		console.log(currentChannel);

		const channel = db.data.channels.find((channel) => channel.id === currentChannel);

		if (!channel) {
			console.log('Channel not found');
			return res.status(404).send({ message: 'Channel not found.' });
		}

		const messages = channel.messages || [];
		console.log('Retrieved messages:', messages);

		const token = req.headers.authorization?.split(' ')[1];

		const decodedToken = jwt.verify(token, SECRET);
		const userId = decodedToken.userId;
		console.log("User ID:", userId);


		const messageId = parseInt(req.query.messageId);
		console.log("messageId:", messageId);
		console.log("Type of messageId:", typeof messageId);
		console.log("Messages array:", messages);
		console.log("messageId:", messageId);
		// Find the message in the database based on the message ID
		const messageIndex = messages.findIndex((message) => message.messageId === messageId);

		console.log('All messages:', messages);

		if (messageIndex !== -1 && messages[messageIndex].userId.toString() === userId.toString()) {
			messages.splice(messageIndex, 1);

			console.log("message deleted successfully");
			await db.write();

			return res.status(200).send("message deleted successfully");
		} else {
			console.log("message not found or unauthorized to delete");
			return res.status(404).send("message not found or unauthorized to delete");
		}

	} catch (error) {
		console.log("Error deleting message", error);
		res.status(500).send("An error occurred while deleting the message.");
	}
});




// POST /messages
router.post('/', async (req, res) => {
	try {
		const { userId, message, messageId, timestamp, userName } = req.body;
		const channelId = req.body.channelId; 

		await db.read();

		// Find the channel with the specified ID
		const channel = db.data.channels.find((c) => c.id === channelId);

		if (!channel) {
			throw new Error(`Channel with ID ${channelId} not found.`);
		}

		const newMessage = {
			userId: userId,
			message: message,
			messageId: messageId,
			timestamp: timestamp,
			userName: userName,
		};

		channel.messages.push(newMessage);

		console.log('Nytt meddelande skapat:', newMessage);

		await db.write();

		res.status(201).send('Nytt meddelande har skapats');
	} catch (error) {
		console.log('Ett fel inträffade med att skapa meddelandet', error);
		res.status(500).send('Ett fel inträffade med att skapa meddelandet.');
	}
});

// PUT /messages/:messageId
router.put('/', async (req, res) => {
	try {
	  await db.read(); 
 
	  const currentChannel = parseInt(req.query.channel);
	  console.log(currentChannel);
 
	  const channel = db.data.channels.find((channel) => channel.id === currentChannel);
 
	  if (!channel) {
		 console.log('Channel not found');
		 return res.status(404).send({ message: 'Channel not found.' });
	  }
 
	  const messages = channel.messages || [];
	  console.log('Retrieved messages:', messages);
 
	  const token = req.headers.authorization?.split(' ')[1];
 
	  const decodedToken = jwt.verify(token, SECRET);
	  const userId = decodedToken.userId;
	  console.log("User ID:", userId);
 
	  const messageId = parseInt(req.query.messageId);
	  console.log("messageId:", messageId);
 
	  const messageIndex = messages.findIndex((message) => message.messageId === messageId);
 
	  console.log('All messages:', messages);
 
	  if (messageIndex !== -1 && messages[messageIndex].userId.toString() === userId.toString()) {
		 // Update the message with new information
		 const { message } = req.body;
		 messages[messageIndex].message = message;
 
		 console.log("Message updated successfully");
		 await db.write();
 
		 return res.status(200).send("Message updated successfully");
	  } else {
		 console.log("Message not found or unauthorized to update");
		 return res.status(404).send("Message not found or unauthorized to update");
	  }
	} catch (error) {
	  console.log("Error updating message", error);
	  res.status(500).send("An error occurred while updating the message.");
	}
 });
 





export default router;
