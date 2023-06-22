import express from "express";
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import jwt from 'jsonwebtoken';

// // Routers
import publicRouter from "./api/routes/public.js";
import usersRouter from "./api/routes/users.js";
import messagesRouter from "./api/routes/messages.js";
import channelsRouter from "./api/routes/channels.js";

// Express saker
dotenv.config()
const app = express()
const PORT = process.env.PORT || 31140
const SECRET = process.env.SECRET || 'tegelsten'

app.use(express.json())

// Array of paths to protect with JWT
const jwtProtectedPaths = ['/api/messages?channels=2']; // Add other paths as needed

app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body);

	// Check if path requires JWT
	const isProtected = jwtProtectedPaths.some(protectedPath => req.path.startsWith(protectedPath));

	if (isProtected) {
		// Check if Authorization header exists
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Missing or invalid Authorization header' });
		}

		// Extract the token from the header
		const token = authHeader.split(' ')[1];

		try {
			// Verify the token
			const decoded = jwt.verify(token, SECRET);
			req.userId = decoded.userId; // Add the userId to the request object

			// Continue to the next middleware or route handler
			next();
		} catch (error) {
			// Return error for invalid or expired token
			return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
		}
	} else {
		// If path doesn't require JWT, continue to the next middleware or route handler
		next();
	}
});


//logger and next function
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	// console.log('Auth header', req.headers.authorization)
	next()
})

// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.options('*', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Added Authorization
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dist = join(__dirname, 'dist');
app.get('*', (req, res) => {
	res.sendFile(join(dist, 'index.html'));
});

// Startar servern
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
})

export default SECRET