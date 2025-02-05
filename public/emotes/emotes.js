// @ts-ignore
import {addMenuBar, API_URL} from '/utils.js';

const insertEmoteTopList =
    async () => {
  let emoteList = document.createElement('ol');
  emoteList.id = 'top-list';
  for (let i = 1; i <= 5; ++i) {
    const response = await fetch(`${API_URL}/emotes/${i}`, {
      method: 'get',
      headers: new Headers({'ngrok-skip-browser-warning': '0'})
    });
    // console.log(`${API_URL}/emotes/${i}`);
    if (response === null || !response.ok) {
      break;
    }
    const json = await response.json();
    const li = document.createElement('li');
    if (json.src === null) {
      li.innerHTML = `${json.name}`;
    } else {
      li.innerHTML = `${json.name} <img src="/emotes/assets/${
          json.src}" alt="Change this:D">`;
    }
    emoteList.appendChild(li);
  }

  let wrapperDiv = document.querySelector('.list-centering-div .wrapper');
  wrapperDiv?.appendChild(emoteList);
}

addMenuBar();
document.addEventListener('DOMContentLoaded', insertEmoteTopList);