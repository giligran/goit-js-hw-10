const requestOptions = {
  headers: {
    'x-api-key':
      'live_hdCYm5Y6kk0DIc6vTTnPkOZhRkUoSjaoR7r5Y0GpyHWMEfHlFMlg49Nrte1HZMoS',
  },
};

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', requestOptions).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    requestOptions
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
