async function addUser(user) {
  const data = {
    name: user.name,
    password: user.password,
    id: user.userId
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(import.meta.env.VITE_API_URL + "users/", options);
  const statusObject = await response.json();
  if (statusObject) {
    return true;
  }
  console.log("Response from API:", statusObject);
  return false;
}

export { addUser };
