import express from "express"
import { getDb } from '../data/database.js'


const router = express.Router()
const db = getDb()

// // GET Public 
// router.get('/', async (req, res) => {
// 	await db.read() 
// 	res.status(200).send(db.data.public)


// })




export default router