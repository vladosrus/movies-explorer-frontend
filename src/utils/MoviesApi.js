export const moviesApiUrl = "https://api.nomoreparties.co";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

export function getMovies() {
  return fetch(`${moviesApiUrl}/beatfilm-movies`, {
    method: "GET",
  }).then(checkResponse);
}
