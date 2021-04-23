const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const sortBtn = document.getElementById("sort-btn");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = title;
    this.name = `${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
        Name: ${userObj.title} ${userObj.name}
        <ol>
        <li>  ${userObj.email} </li>
        <li>  ${userObj.gender} </li>
        </ol>
    </div>`;
    userList.appendChild(userEl);
  });

  function searchEventHandler(e) {
    console.log(e, searchInput.value);
    const filteredAppState = appState.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    });
    domRenderer(filteredAppState);
  }

  function sortEventHandler(e) {
    const appStateCopy = [...appState];
    appStateCopy.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    domRenderer(appStateCopy);
  }

  searchInput.addEventListener("keyup", searchEventHandler);
  sortBtn.addEventListener("click", sortEventHandler);
};
