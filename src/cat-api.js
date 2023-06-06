// for cat-api.js
export  function fetchBreeds() {
  const apiKey='live_hdCYm5Y6kk0DIc6vTTnPkOZhRkUoSjaoR7r5Y0GpyHWMEfHlFMlg49Nrte1HZMoS'
  fetch('https://api.thecatapi.com/v1/breeds', {
    'x-api-key': apiKey}).then(response =>{
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }).then(data => {
    console.log(data)
    return data.map(bread=>console.log(bread))
  }).catch(error=> {
    console.error('Произошла ошибка:', error);
    throw error;
  })  
};
