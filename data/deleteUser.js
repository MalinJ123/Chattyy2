async function deleteUser(userId) {
    console.log('Deleting User...');

    const data = {
        id: Number(userId)
    };

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(import.meta.env.VITE_API_URL + 'users/' + userId, options);
    const statusObject = await response.json();
    console.log('Response: ', data);
    if (statusObject) {
        return true;
    }
    return false;
}

export { deleteUser };
