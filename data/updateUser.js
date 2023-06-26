async function updateUser(user) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(import.meta.env.VITE_API_URL + "users/" + user.id, options);
  const statusObject = await response.json();
  if (statusObject) {
    return true;
  }
  console.log("Response from API:", statusObject);
  return false;
}

export { updateUser };
