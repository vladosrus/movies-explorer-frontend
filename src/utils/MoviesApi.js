const moviesApiUrl = "https://api.nomoreparties.co/beatfilm-movies";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function getInitialMovies() {
  return fetch(moviesApiUrl, {
    method: "GET",
  }).then(checkResponse);
}
