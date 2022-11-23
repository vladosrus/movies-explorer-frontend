// const mainApiUrl = "https://movies-explorer.chikov.nomoredomains.icu/api";
const moviesApiUrl = "https://api.nomoreparties.co";
const devUrl = "http://localhost:3001/api";
const headers = {
  "Content-Type": "application/json",
  origin: devUrl,
};
const credentials = "include";

export default moviesApiUrl;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.json());
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
export function getSavedMovies() {
  return fetch(`${devUrl}/movies`, {
    method: "GET",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
export function updateProfileInfo(name, email) {
  return fetch(`${devUrl}/users/me`, {
    method: "PATCH",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
}
export function createSavedMovie(movie) {
  return fetch(`${devUrl}/movies`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${moviesApiUrl}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${moviesApiUrl}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then(checkResponse);
}
export function deleteSavedMovie(movieId) {
  return fetch(`${devUrl}/movies/${movieId}`, {
    method: "DELETE",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
