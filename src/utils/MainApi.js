// const mainApiUrl = "https://movies-explorer.chikov.nomoredomains.icu/api";
const devUrl = "http://localhost:3001/api";
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
export function registration(name, email, password) {
  return fetch(`${devUrl}/signup`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function authorization(email, password) {
  return fetch(`${devUrl}/signin`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
export function logout() {
  return fetch(`${devUrl}/signout`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
export function getProfileInfo() {
  return fetch(`${devUrl}/users/me`, {
    method: "GET",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
