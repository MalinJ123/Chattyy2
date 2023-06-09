import express from "express";
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

// Routers
import publicRouter from "./api/routes/public.js";
import usersRouter from "./api/routes/users.js";
import searchQuery from "./api/routes/search.js";
import messagesRouter from "./api/routes/messages.js";

// Express saker
dotenv.config()
const app = express()
const PORT = process.env.PORT || 31140

// The middlemen are looking at us

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

app.use(express.json())

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



// -> CRUD products
app.use('/api/public', publicRouter)

// -> Messages 
app.use('/api/messages', messagesRouter)

// -> Search products
app.use('/api/search', searchQuery)

// -> CRUD users
app.use('/api/users', usersRouter)

app.get('*', (req, res) => {
    res.sendFile(join(dist, 'index.html'))
})



// Startar servern
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
})