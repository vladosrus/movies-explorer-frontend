import { moviesApiUrl } from "./MoviesApi.js";

const mainApiUrl =
  process.env.REACT_APP_PROCESS === "develop"
    ? "http://localhost:3001/diploma/api"
    : "https://vladislav-chikov-projects.ru/diploma/api";

const headers = {
  "Content-Type": "application/json",
  origin: mainApiUrl,
};
const credentials = "include";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject({ promise: res.json(), status: res.status });
  }
}
export function registration(name, email, password) {
  return fetch(`${mainApiUrl}/signup`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function authorization(email, password) {
  return fetch(`${mainApiUrl}/signin`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
export function logout() {
  return fetch(`${mainApiUrl}/signout`, {
    method: "POST",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
export function getProfileInfo() {
  return fetch(`${mainApiUrl}/users/me`, {
    method: "GET",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
export function getSavedMovies() {
  return fetch(`${mainApiUrl}/movies`, {
    method: "GET",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
export function updateProfileInfo(name, email) {
  return fetch(`${mainApiUrl}/users/me`, {
    method: "PATCH",
    headers: headers,
    credentials: credentials,
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
}
export function createSavedMovie(movie) {
  return fetch(`${mainApiUrl}/movies`, {
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
  return fetch(`${mainApiUrl}/movies/${movieId}`, {
    method: "DELETE",
    headers: headers,
    credentials: credentials,
  }).then(checkResponse);
}
