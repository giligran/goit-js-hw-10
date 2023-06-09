import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedSelect: document.querySelector('select.breed-select'),
  catInfoDiv: document.querySelector('div.cat-info'),
  loader: document.querySelector('p.loader'),
  error: document.querySelector('p.error'),
};

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    refs.breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  refs.catInfoDiv.innerHTML = '';

  const image = document.createElement('img');
  image.src = cat[0].url;
  refs.catInfoDiv.appendChild(image);

  const name = document.createElement('p');
  name.textContent = `Назва породи: ${cat[0].breeds[0].name}`;
  refs.catInfoDiv.appendChild(name);

  const description = document.createElement('p');
  description.textContent = `Опис: ${cat[0].breeds[0].description}`;
  refs.catInfoDiv.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = `Темперамент: ${cat[0].breeds[0].temperament}`;
  refs.catInfoDiv.appendChild(temperament);
}

refs.breedSelect.addEventListener('change', () => {
  const selectedBreedId = refs.breedSelect.value;

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
});

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
