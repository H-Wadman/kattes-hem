import {loadUsers} from './utils.js';

const getPortraitDiv_old = (user, gameList) => {
  return `<div class="portrait">
                        <img
                            src="assets/profilbilder/${user.icon}"
                        />
                        <h2>${user.ign}</h2>
                        <h4>${user.title}</h4>
                        <p><em>Namn:</em> ${user.name}</p>
                        <p><em>Plays:</em></p>
                        <ul>
                          ${gameList}
                        </ul>
                        <p><em>Lore:</em></p>
                        <p style="margin-left: 2em">${user.lore}</p>
                    </div>`;
};

const getPortraitDiv = (user) => {
  return `<div class="portrait">
                        <a href="/personer/profile.html?ign=${
      user.ign.toLowerCase()}">
                          <img
                              src="assets/profilbilder/${user.icon}"
                          />
                        </a>
                        <h2>${user.ign}</h2>
                        <h4>${user.title}</h4>
                    </div>`;
};

const insertPresentations = async () => {
  let jsonObject = await loadUsers();
  let users = jsonObject.users;
  let pres = document.getElementById('presentation');
  if (pres === null) {
    console.error('Could not find presentation element');
    return
  }
  console.log(users);

  let presRow = undefined;
  let counter = 0;
  for (const user of users) {
    if (counter % 3 === 0) {
      presRow = document.createElement('div');
      presRow.classList.add('portrait-row');
      pres.appendChild(presRow);
    }
    ++counter;
    let gameList = '';
    for (const game of user.games) {
      gameList += `<li>${game}</li>\n`;
    }

    if (presRow === undefined) {
      console.error('Could not find presentation row element');
      return
    }

    presRow.innerHTML += getPortraitDiv(user);
  }
};

document.addEventListener('DOMContentLoaded', insertPresentations);
