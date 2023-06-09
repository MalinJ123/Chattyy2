import { API_URL } from "./constants";

async function clearProduct(product) {
    console.log('deleting product...');
    
    const dataProduct = {
        id: Number(product)
    } 
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataProduct)
    }

    const response = await fetch(API_URL + 'products/' + product, options );
    const data = await response.json();
    console.log('Response: ', data);
    if (data){
        return true
    }
    return false;
}

export {clearProduct};