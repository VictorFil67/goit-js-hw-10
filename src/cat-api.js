import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_NCITur9P2MR1Zl9oIfGn32aBYLdzZjKE4reMDRLO711Ro273A0XaOFiXkGdPdIB5";
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

export function fetchBreeds() {
    loader.classList.remove('is-hidden');
    breedSelect.classList.add('is-hidden');
    return  axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        return response.data;
    })
    .catch(err => {
        error.classList.remove('is-hidden');
        loader.classList.add('is-hidden');
        breedSelect.classList.add('is-hidden');
        console.log('Oops!');
    });
    
}
function breedTemplate({id, name}) {
    return `<option value = "${id}">${name}</option>`;
    }
    
    function breeds(breedsArr) {
        return breedsArr.map(breedTemplate).join('');
    }
    
    export function renderBreeds(breedsArr) {
    const markup = breeds(breedsArr);
    breedSelect.innerHTML = markup;
    }
 
    export function fetchCatByBreed(breedId) {
        const BASE_URL = 'https://api.thecatapi.com';
        const END_POINT = '/v1/images/search';
        const PARAMS = `?breed_ids=${breedId}`;
        const url = `${BASE_URL}${END_POINT}${PARAMS}`;
        return axios.get(url)
        .then(res => res.data)
        .catch(err => {
            error.classList.remove('is-hidden');
            loader.classList.add('is-hidden');
            breedSelect.classList.add('is-hidden');
            console.log('Oops!');
        });
    }

    export function catMarkup(data) {
        const {url, height, width, breeds} = data[0];
        const  {description, temperament, name} = breeds[0];
        // console.log(description, temperament, name);
        // console.log(url, height, width);
        return `<img src = "${url}" alt = "${name}" width = "${width}" height = "${height}"/> <h2>${name}</h2><p>${description}</p><p>${temperament}</p>`;
    }
