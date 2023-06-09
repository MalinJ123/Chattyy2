import { getUsers } from "../data/getUsers";
import { useLoaderData } from "react-router-dom";
import "../stylesheet/users.css";
import { deletUser } from "../data/deleteUser";
import { Link } from "react-router-dom";
import { updateUser } from "../data/updateUser";
import { useState } from "react";

export const loader = () => getUsers();

const Users = () => {
    const userData = useLoaderData();

    const [editingUser, setEditingUser] = useState({});
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleDelete = async (userId) => {
        console.log(userId);
        try {
            const result = await deletUser(userId);
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onEditUser = (user) => {
        setEditingUser(user)
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let editUser = {
            id: editingUser.id,
            name: userName,
            password: userPassword,
        }

        const result = await updateUser(editUser)
        console.log(result);
        setEditingUser({})
    }



    return(
            <div className="users-div">

            {userData.map((user) => (
                <div key={user.id} className="user-div">
                    {
                        editingUser.id === user.id ? (
                            <form onSubmit={onSubmit}>
                                <p>Ändrar på {user.name}</p>
                                <input type="text" placeholder={user.name} value={userName} onChange={handleUserNameChange} />
                                <input type="text" placeholder={user.password} value={userPassword} onChange={handleUserPasswordChange} />
                                <button className="user-btn" type="submit">Spara</button>
                                <button className="user-btn" onClick={() => setEditingUser({})}>Avbryt</button>
                            </form>
                        ) 
                        : 
                        <>
                            <li className="user-li"> Id: {user.id} <br /> Användarnamn: {user.name}</li>
                            <div className="user-button">
                                <button onClick={() => onEditUser(user)} className="user-btn"> Uppdatera</button>
                                <button onClick={() => handleDelete(user.id)} className="user-btn"> Ta bort</button>
                            </div>
                        </>
                    }
                </div>
                )
                )
            }
            </div>
    )
}

export default Users;
