import Notiflix from 'notiflix';
const requestOptions = {
  headers: {
    'x-api-key':
      'live_hdCYm5Y6kk0DIc6vTTnPkOZhRkUoSjaoR7r5Y0GpyHWMEfHlFMlg49Nrte1HZMoS',
  },
};

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', requestOptions)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Помилка під час отримання списку порід:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    requestOptions
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Помилка під час отримання інформації про кота:', error);
      throw error;
    });
}
