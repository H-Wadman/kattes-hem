const loadUsers = async () => {
  let response = await fetch("katte-users.json");

  if (!response.ok) {
    throw new Error("Network response when loading user returned an error");
  }
  return response.json();
};

const insertPresentations = async () => {
  let jsonObject = await loadUsers();
  let users = jsonObject.users;
  let pres = document.getElementById("presentation");
  console.log(users);
  for (const user of users) {
    let gameList = "";
    for (const game of user.games) {
      gameList += `<li>${game}</li>\n`;
    }
    pres.innerHTML += `<div class="portrait">
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
  }
};

document.addEventListener("DOMContentLoaded", insertPresentations);
