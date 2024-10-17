export const loadUsers = async () => {
  let response = await fetch('/katte-users.json');

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error('Network response when loading user returned an error');
  }
  return response.json();
};
