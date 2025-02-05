export const API_URL = 'https://mistakenly-diverse-parrot.ngrok-free.app'

export const loadUsers = async () => {
  let response = await fetch('/katte-users.json');

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error('Network response when loading user returned an error');
  }
  return response.json();
};

export const addMenuBar = () => {
  const menu = `<ul id="menu-bar">
            <li><a href="/index.html">Home</a></li>
            <li><a href="/emotes/emotes.html">Emotes</a></li>
            <li><a>Wiki</a></li>
            <li><a>Bingo</a></li>
        </ul>`;

  document.body.innerHTML = menu + document.body.innerHTML;
}
