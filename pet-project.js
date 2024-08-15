const loadUsers = async () => {
  let response = await fetch("katte-users.json");

  if (!response.ok) {
    throw new Error("Network response when loading user returned an error");
  }
  return response.json();
};

const getPortraitDiv = (user, gameList) => {
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

const insertPresentations = async () => {
  let jsonObject = await loadUsers();
  let users = jsonObject.users;
  let pres = document.getElementById("presentation");
  let presRow = undefined;
  console.log(users);
  let counter = 0;

  for (const user of users) {
    if (counter % 4 === 0) {
      presRow = document.createElement("div");
      presRow.classList.add("portrait-row");
      pres.appendChild(presRow);
    }
    ++counter;
    let gameList = "";
    for (const game of user.games) {
      gameList += `<li>${game}</li>\n`;
    }
    presRow.innerHTML += getPortraitDiv(user, gameList);
  }
};

document.addEventListener("DOMContentLoaded", insertPresentations);
