import { API_URL } from "./constants.js";

async function updateProduct(product) {
  //let tag = product.tags[tags.length]
  const data = {
    id: Number(product.id),
    name: product.name,
    price: Number(product.price),
    image: product.image,
    tags: [product.tags],
  };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(API_URL + "products/" + product.id, options);
  const statusObject = await response.json();
  console.log("response from Api", statusObject);
}

export { updateProduct };
