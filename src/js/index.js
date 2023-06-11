import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breed = new SlimSelect({
  select: 'select.breed-select',
  settings: {
    openPosition: 'auto',
    placeholderText: 'Choose your breed',
    searchText: 'Sorry, but we did not find that breed',
    searchPlaceholder: 'Find the breed you need',
  },
  events: {
    afterChange: onSelect,
  },
});
breed.disable();

function onSelect(val) {
  const { id, value } = val[0];
  if (value === 'none') {
    return;
  }
  refs.loader.classList.remove('visually-hidden');
  fetchCatByBreed(id).then(data => createMarkup(data));
}

const refs = {
  breedSelect: document.querySelector('select.breed-select'),
  catInfoDiv: document.querySelector('div.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

function initSelect() {
  fetchBreeds()
    .then(res => {
      const breedsSelect = res.map(breedEl => {
        return { id: breedEl.id, text: breedEl.name };
      });

      breedsSelect.unshift({
        placeholder: true,
        value: 'none',
        text: 'Choose your breed',
      });

      breed.setData(breedsSelect);
    })
    .catch(error => {
      console.log(error);
      onError();
    });
}

function createMarkup(data) {
  data = data[0];
  console.dir(data);
  refs.catInfoDiv.innerHTML = '';
  refs.loader.classList.add('visually-hidden');
  refs.catInfoDiv.innerHTML = `<div class="thumb">
        <img src=${data.url} alt='${data.breeds[0].name}' />
      </div><div class='description'><h1 class="breed-name">${data.breeds[0].name}</h1>
      <p class='description-text'>
        <span><b>Description: </b>${data.breeds[0].description}</span>
      </p>
      <p class='description-temperament'>
        <span><b>Temperament: </b>${data.breeds[0].temperament}</span
        >
      </p></div>`;
  return;
}

window.addEventListener('load', () => {
  initSelect();
  breed.enable();
  refs.loader.classList.add('visually-hidden');
});

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
