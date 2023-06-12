import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';



// // Routers
import publicRouter from "./api/routes/public.js";
import usersRouter from "./api/routes/users.js";
import searchQuery from "./api/routes/search.js";
import messagesRouter from "./api/routes/messages.js";

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
	
	const file = join(__dirname,'api/data/', 'db.json')
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



// -> messages
app.use('/api/messages', messagesRouter);
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