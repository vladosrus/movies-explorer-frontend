// const mainApiUrl = "https://movies-explorer.chikov.nomoredomains.icu/api";
const devUrl = "http://localhost:3001/api"
const headers = {
  "Content-Type": "application/json",
  origin: devUrl,
};
const credentials = "include";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
