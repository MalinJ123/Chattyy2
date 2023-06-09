import { API_URL } from "./constants";

async function getProducts() {
    console.log('Getting products...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(API_URL + 'products/', options );
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {getProducts};