import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid"; // För att generera unika ID:n för meddelandena
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/adapters/JSONFile.js';



// // Routers
import publicRouter from "./api/routes/public.js";
import usersRouter from "./api/routes/users.js";
import searchQuery from "./api/routes/search.js";
// import messagesRouter from "./api/routes/messages.js";

// Express saker
dotenv.config()
const app = express()
const PORT = process.env.PORT || 31140

app.use(express.json())

// Skapa sökväg till databasen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);


// Funktion för att hämta databasen
async function getDb() {
	await db.read()
	return db
 }



// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	next();
})
app.options('*', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.send();
});


// Logger
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})


// Routes //
const whereWeAre = dirname(fileURLToPath(import.meta.url))
const dist = join(whereWeAre, './dist')
app.use( express.static(dist) )
// -> Start


// Messages
app.post("/messages", async (req, res) => {
	try {
		const { userId, message } = req.body;

		// Skapa ett nytt meddelandeobjekt med ett unikt ID
		const newMessage = {
			id: uuidv4(),
			userId,
			message,
		};

		await db.read(); // Läs databasen
		db.data.messages.push(newMessage); // Lägg till det nya meddelandet i databasen
		await db.write(); // Spara ändringarna i databasen

		console.log("Meddelandet har sparats i databasen.");

		res.sendStatus(200);
	} catch (error) {
		console.log("Ett fel inträffade vid sparande av meddelandet i databasen.", error);
		res.sendStatus(500);
	}
});

app.get("/messages", async (req, res) => {
	try {
		await db.read(); // Läs databasen
		const messages = db.data.messages; // Hämta alla meddelanden från databasen

		console.log("Hämtade meddelanden från databasen:", messages);

		res.send(messages);
	} catch (error) {
		console.log("Ett fel inträffade vid hämtning av meddelandena från databasen.", error);
		res.sendStatus(500);
	}
});


// -> public
app.use('/api/public', publicRouter)
// -> Search products
app.use('/api/search', searchQuery)
// -> users
app.use('/api/users', usersRouter)

app.get('*', (req, res) => {
    res.sendFile(join(dist, 'index.html'))
})



// Startar servern
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
})