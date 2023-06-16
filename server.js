import express from "express";
import * as dotenv from 'dotenv'

// // Routers
import publicRouter from "./api/routes/public.js";
import usersRouter from "./api/routes/users.js";
import messagesRouter from "./api/routes/messages.js";
import channelsRouter from "./api/routes/channels.js";

// Express saker
dotenv.config()
const app = express()
const PORT = process.env.PORT || 31140
const SECRET = 'tegelsten'

app.use(express.json())

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


// -> channels
app.use('/api/channels', channelsRouter) 
// -> messages
app.use('/api/messages', messagesRouter);
// -> public
app.use('/api/public', publicRouter)
// -> users
app.use('/api/users', usersRouter)


app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'))
})

// Startar servern
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
})

export default SECRET