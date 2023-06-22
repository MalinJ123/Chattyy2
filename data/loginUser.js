import { sessionStorageKey } from '../src/ContextRoot';


async function loginUser(oneUser) {
    console.log("Logging in user...");

    const token = sessionStorage.getItem(sessionStorageKey);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(oneUser),
    };
    const response = await fetch(import.meta.env.VITE_API_URL + 'users/login', options);
    const statusObject = await response.json();
    console.log('Response from API: ', statusObject);

    // Store the token
    sessionStorage.setItem(sessionStorageKey, 'Bearer ' + statusObject.token);
    console.log(statusObject.token);
    return statusObject;
}

export default loginUser;
