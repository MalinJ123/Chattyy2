import express from "express";
import { getDb } from "../data/database.js";


const router = express.Router();
const db = getDb();


// Hämta all Kanaler
router.get("/", async (req, res) => {
	await db.read();
	const channelIds = db.data.channels.map((channel) => channel.id);
	res.status(200).send(channelIds);
});




export default router;