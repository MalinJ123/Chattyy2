import { API_URL } from "./constants.js";

async function updateUser(user) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(API_URL + "users/" + user.id, options);
  const statusObject = await response.json();
  if (statusObject) {
    return true;
  }
  console.log("response from Api", statusObject);
  return false;
}

export { updateUser };