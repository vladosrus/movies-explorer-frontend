const moviesApiUrl = "https://api.nomoreparties.co/beatfilm-movies";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getMovies() {
  return fetch(moviesApiUrl, {
    method: "GET",
  }).then(checkResponse);
}
