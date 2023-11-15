import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import Notiflix from 'notiflix';
import { fetchBreeds, renderBreeds, fetchCatByBreed, catMarkup} from "./cat-api.js";

// new SlimSelect({
//     select: document.querySelector('.breed-select'),
//   });

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
// console.log(loader);
loader.classList.add('is-hidden');
error.classList.add('is-hidden');

fetchBreeds().then(catBreeds => {
    renderBreeds(catBreeds);
    new SlimSelect({
            select: document.querySelector('.breed-select'),
          });
    loader.classList.add('is-hidden');
    breedSelect.classList.remove('is-hidden');
})
.catch(error => {
    console.log('Oops!');
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
});

breedSelect.addEventListener('change', onBreedSelectChange);

    function onBreedSelectChange(e) {
       
        loader.classList.remove('is-hidden');
        catInfo.classList.add('is-hidden');
        const breedId = e.target.value;
        // console.log(breedId);
        fetchCatByBreed(breedId).then(data => {
            catInfo.innerHTML = catMarkup(data);
            breedSelect.classList.remove('is-hidden');
            catInfo.classList.remove('is-hidden');
            loader.classList.add('is-hidden');
          })
          .catch(error => {
            console.log('Oops!');
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        });
    }