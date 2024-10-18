import {loadUsers} from '../utils.js';

const selectUser = async (ign) => {
  const users = await loadUsers();
  for (const user of users.users) {
    if (user.ign.toLowerCase() === ign.toLowerCase()) {
      return user;
    }
  }
};

const onLoadProfile = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const user = await selectUser(queryParams.get('ign'));

  const ignElement = document.getElementById('ign');
  if (ignElement === null) {
    console.error('Could not find ign element');
    return
  } else {
    ignElement.innerText = user.ign;
  }
};


document.addEventListener('DOMContentLoaded', onLoadProfile);