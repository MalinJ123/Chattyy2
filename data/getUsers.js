async function getUsers() {
    console.log('Getting users...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(import.meta.env.VITE_API_URL + 'users/', options);
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export { getUsers };
