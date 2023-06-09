// for cat-api.js
const requestOptions = {
  headers: {
    'x-api-key':
      'live_hdCYm5Y6kk0DIc6vTTnPkOZhRkUoSjaoR7r5Y0GpyHWMEfHlFMlg49Nrte1HZMoS',
  },
};
let storedBreeds = [];

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      data = data.filter(img => img.image?.url != null);

      storedBreeds = data;

      for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');
        if (!breed.image) continue;
        option.value = breed.id;
        option.innerHTML = `${breed.name}`;
        document.querySelector('.breed-select').appendChild(option);
      }
      showBreedImage(storedBreeds[0].id);
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
      throw error;
    });
}
function showBreedImage(breedId) {
  const breed = storedBreeds.find(breed => breed.id === breedId);
  if (breed) {
    document.querySelector('#breed-image').src = breed.image.url;
    document.querySelector('.description').textContent = breed.description;
  }
}
const select = document.querySelector('.breed-select');
select.addEventListener('change', function () {
  const selectedBreedId = this.value;
  if (selectedBreedId) {
    showBreedImage(selectedBreedId);
  }
});

// refs.breedSelect.addEventListener('change', () => {
//   const selectedBreedId = refs.breedSelect.value;

//   refs.loader.classList.add('visible');
//   refs.catInfoDiv.classList.remove('visible');

//   fetchCatByBreed(selectedBreedId)
//     .then(cat => {
//       refs.loader.classList.remove('visible');
//       displayCatInfo(cat);
//       refs.catInfoDiv.classList.add('visible');
//     })
//     .catch(err => {
//       refs.loader.classList.remove('visible');

//       refs.error.classList.add('visible');
//     });
// });

breedSelect.onChange = () => {
  const selectedBreedId = breedSelect.selectedValue();

  refs.loader.classList.add('visible');
  refs.catInfoDiv.classList.remove('visible');

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      refs.loader.classList.remove('visible');
      displayCatInfo(cat);
      refs.catInfoDiv.classList.add('visible');
    })
    .catch(err => {
      refs.loader.classList.remove('visible');
      refs.error.classList.add('visible');
    });
};

window.addEventListener('load', () => {
  refs.loader.classList.add('visible');
  refs.breedSelect.classList.remove('visible');

  fetchBreeds()
    .then(breeds => {
      refs.loader.classList.remove('visible');
      refs.breedSelect.classList.add('visible');
      populateBreedSelect(breeds);
    })
    .catch(err => {
      refs.loader.classList.remove('visible');
      refs.error.classList.add('visible');
    });
});

// function populateBreedSelect(breeds) {
//   breeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     refs.breedSelect.appendChild(option);
//   });
// }
