import moviesApiUrl from "./MainApi";


function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getMovies() {
  return fetch(`${moviesApiUrl}/beatfilm-movies`, {
    method: "GET",
  }).then(checkResponse);
}
