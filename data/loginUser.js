import { API_URL } from "./constants";

async function loginUser(oneUser) {
    console.log("Logging in user...");
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oneUser)
    }
    const response = await fetch(API_URL + 'users/' + 'login' , options)
    const statusObject = await response.json()
    console.log('Response from API: ', statusObject);
    return {loggedIn: statusObject.status, username: statusObject.username, id: statusObject.id, token: statusObject.token}
}

export default loginUser;