import { API_URL } from "./constants.js";

async function addUser(user) {
  
  const data = {
    name: user.name,
    password: user.password
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(API_URL + "users/", options);
  const statusObject = await response.json();
  if(statusObject){
    return true
  }
  console.log("response from Api", statusObject);
  return false;
}

export { addUser };