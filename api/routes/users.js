import express from "express";
import jwt from 'jsonwebtoken';
import { getDb } from "../data/database.js";
import { isValidId, isValidUser } from "../data/validate.js";

import SECRET from '../../server.js'

const router = express.Router();
const db = getDb();





// GET Users - hela listan
router.get("/", async (req, res) => {
    try {
        await db.read();
        const users = db.data.users;
        console.log("Visar user-lista", users);
        res.send(users);
    } catch (error) {
        console.log("Detta är vad vi får tillbaka i user-listan", error);
        res.status(500).send("Ett fel inträffade med att hämta användarna.");
    }
});

//JWT lektion-kod
router.get('/authorization', async (req, res) => {

    await db.read()

    const users = db.data.users

    let authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).send({ message: 'Du behöver vara autentiserad för att kunna delta'})

        return
    }

    let token = authHeader.replace('Bearer: ', '')

    try {
        let decoded = jwt.verify(token, SECRET)
        
        console.log('GET /authorization dekryptat: ', decoded);

        let userId = decoded.userId
        let user = users.find(user => user.id = userId)

        console.log(`Användaren ${user.username} har tillgång till låsta kanaler!`);

        res.status(202).send({ message: 'Du är autentiserad'})
    } catch (error) {
        console.log('GET /authorization felmeddelande: ', error.message)
        res.status(401).send({message: 'Du blev inte autentiserad!'})
    }
})


// POST - login
router.post("/login", async (req, res) => {

    // Reading database
    await db.read()
    const users = db.data.users

    // Variables for requesting body data
    let userName = req.body.name
    let userPassword = req.body.password

    if (!req.body || !userName || !userPassword) {
        res.status(401).send({ message: 'Användarnamn och lösenord får inte lämnas tomt!'})
        return
    }

    // Check if User (username) exists
    let findUser = users.find(user => user.name === userName)

    if (!findUser) {
        console.log('Felaktigt användarnamn');
        res.status(401).send({ message: 'Denna användaren existerar ej'})
        
        return
    }

    if (findUser.password !== userPassword) {
        console.log('Felaktigt lösenord');
        res.status(401).send({message: 'Felaktigt användarnamn eller lösenord'})

        return
    }

    // Successful login! Create a JWT token and send it back

    const hour = 60 * 60
    const payload = {userId: findUser.id}
    const options = {expiresIn: 2 * hour}

    let token = jwt.sign(payload, SECRET, options)

    console.log('Signerad JWT: ', token);



    let tokenPackage = {token: token, name: findUser.name, id: findUser.id, status: "Success"}
    res.send(tokenPackage)
})


//GET Users - med ID
router.get("/:id", async (req, res) => {
    try {
        await db.read();
        const users = db.data.users;
        const userId = parseInt(req.params.id);

        const user = users.find((user) => user.id === userId);

        if (!user) {
            return res.status(404).send("User not found.");
        } else {
            console.log("Visar användaren med ID:", user);
            res.send(user);
        }
    } catch (error) {
        console.log("Ett fel uppstod vid hämtning av användare:", error);
        res.status(500).send("Ett fel uppstod vid hämtning av användare.");
    }
});



//Post User
router.post("/", async (req, res) => {
    await db.read();
    console.log("test 1");

    let name = req.body.name;
    let password = req.body.password;
    function generateId() {
        return Math.floor(Math.random() * 10000);
    }
    let newUser = {
        id: generateId(),
        name,
        password,
    };
    console.log("newUser", newUser);
    if (!isValidUser(newUser)) {
        console.log("test 2", newUser);
        console.log("det måste vara sträng");
        res.status(400).send("Det måste vara sträng inte nummer");

        return;
    } else {
        db.data.users.push(newUser);
        await db.write();
        res.status(200).send(newUser);
        console.log("test 3", newUser);
    }
});

router.delete("/:id", async (req, res) => {
    await db.read();
    if (!isValidId(req.params.id)) {
        return res.status(400).send("Invalid ID");
    }

    let id = Number(req.params.id);
    let userToDelete = db.data.users.find((user) => user.id === id);
    if (!userToDelete) {
        return res.status(400).send("Kunde inte hitta användaren, kontrollera att Id är är korrekt");
    } else {
        db.data.users = db.data.users.filter((user) => user.id !== id);
        await db.write();
        console.log("test 3");
        return res.sendStatus(200);
    }
});

// Edit user
router.put("/:id", async (req, res) => {
    await db.read();

    let editedUser = req.body


    let id = Number(req.params.id);
    let oldUser = db.data.users.find((user) => user.id === id);
    let oldIndex = db.data.users.findIndex((user) => user.id === id);

    if (!isValidId(req.params.id)) {
        return res.status(400).send("Ogitligt Id, Kontrollera att det endast är siffror och inte bokstäver");
    }

    if (!oldUser) {
        return res.status(400).send("Kunde inte hitta användaren, kontrollera att Id  är korrekt");
    }

    // oldUser.name = editedUser.name;
    // oldUser.password = editedUser.password;
    console.log('edited user', oldIndex, editedUser)


    db.data.users[oldIndex] = editedUser;
    await db.write();
    res.status(200).send(JSON.stringify(editedUser))
});



export default router;
