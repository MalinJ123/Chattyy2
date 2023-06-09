import express from "express";
import { getDb } from "../data/database.js";
import { isValidId, isValidUser } from "../data/validate.js";

const router = express.Router();
const db = getDb();

//	 X	 GET - User lista
//	 X  GET - Users genom ID
//	 X	 POST - Uppdatera User
//	 X	DELETE - Radera ALLA User
//		 DELETE - Radera Användare med Id

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

// Fejk POST - Är till för att användare ska kunna logga in i sidan
router.post("/login", async (req, res) => {
    await db.read()
        const users = db.data.users;
        const userName = req.body.name;
        const userPassword = req.body.password;
        
        const getUser = users.find((user) => user.name === userName && user.password === userPassword);

        console.log(getUser);

        if (!getUser) {
            res.status(404).send("Användaruppgifter ofullständiga.");
        } else {
            res.send({status: "Inloggad"})
        }
 
}
)

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

// DELETE User
router.delete("/all", async (req, res) => {
    await db.read();
    db.data.users = [];
    await db.write();
    res.sendStatus(200);
})

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

    if (!isValidId(req.params.id)) {
        return res.status(400).send("Ogitligt Id, Kontrollera att det endast är siffror och inte bokstäver");
    }

    if (!oldUser) {
        return res.status(400).send("Kunde inte hitta användaren, kontrollera att Id  är korrekt");
    }

    oldUser.name = editedUser.name;
    oldUser.password = editedUser.password;

    db.data.users[oldUser] = editedUser;
    await db.write();
    res.status(200).send(JSON.stringify(editedUser))
});



export default router;
