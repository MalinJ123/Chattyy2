import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid";
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
// import { getDb } from "../data/database.js";



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

const db = getDb(); 
const whereWeAre = dirname(fileURLToPath(import.meta.url))
const dist = join(whereWeAre, './dist')
app.use( express.static(dist) )
// -> Start

function getDb() {
	// Create search path to the database
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const file = join(__dirname, 'db.json')
	const adapter = new JSONFile(file)
	const db = new Low(adapter, {})
	// {} is default data
	return db
}


// middleware and logger

//logger and next function
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	// console.log('Auth header', req.headers.authorization)
	next()
})


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




// Messages
app.post("/messages", async (req, res) => {
	try {
	  const { userId, message } = req.body;
	  const newMessage = {
		 id: uuidv4(),
		 userId,
		 message,
	  };

	  db.data.messages.push(newMessage);
	  await db.write();
 
	  console.log("Meddelandet har sparats i databasen.");
 
	  res.sendStatus(200);
	} catch (error) {
	  console.log("Ett fel inträffade vid sparande av meddelandet i databasen.", error);
	  res.sendStatus(500);
	}
 });

app.get("/messages", async (req, res) => {
	try {
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