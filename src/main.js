import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import err from './img/err.svg';
import httpRequest from './js/pixabay-api.js';
import createMarkup from './js/render-functions.js';

const key = '44447356-a60fa6f4c2d7f10e895940a18';
const form = document.querySelector('.form');
const list = document.querySelector('.list');
const button = document.querySelector('.loadMoreBtn');
const loader = document.querySelector('.loader');
const perPage = 15;

let pageNumber = 1;
let text = '';

form.addEventListener('submit', searchHandler);
button.addEventListener('click', addGallery);

function searchHandler(evt) {
  button.style.display = 'none';
  list.innerHTML = '';
  text = evt.target.elements.input.value.trim();
  evt.preventDefault();
  if (text != 0) {
    loader.style.display = 'block';
    pageNumber = 1;
    getGalleryItems();
  }
}
function addGallery() {
  loader.style.display = 'block';
  pageNumber += 1;
  getGalleryItems();
}
function getGalleryItems() {
  httpRequest(key, text, pageNumber, perPage)
    .then(response => {
      const photos = response.hits;
      if (photos.length !== 0) {
        list.insertAdjacentHTML('beforeend', createMarkup(photos));
        if (response.totalHits > perPage * pageNumber) {
          button.style.display = 'block';
        } else {
          button.style.display = 'none';
          iziToast.show({
            class: 'toast',
            position: 'topRight',
            messageColor: 'white',
            message: `We're sorry, but you've reached the end of search results.`,
          });
        }
        const lightbox = new SimpleLightbox('.list a', {
          captions: true,
          captionType: 'attr',
          captionsData: 'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
        });
        lightbox.refresh();
      } else {
        loader.style.display = 'none';
        iziToast.show({
          class: 'toast',
          position: 'topRight',
          icon: 'icon',
          iconUrl: err,
          iconColor: 'white',
          messageColor: 'white',
          message: `Sorry, there are no images matching your search query. Please try again!`,
        });
      }
    })
    .catch(error => {
      iziToast.show({
        class: 'toast',
        position: 'topRight',
        icon: 'icon',
        iconUrl: err,
        iconColor: 'white',
        messageColor: 'white',
        title: 'Error',
        titleColor: 'white',
        message: `Please try again!`,
      });
      if (error.response) {
        console.error('Server error:', error.response.status);
      } else if (error.request) {
        console.error('No response from server');
      } else {
        console.error('Unknown error:', error.message);
      }
    })
    .finally(() => {
      const cardSizes = list.lastChild.getBoundingClientRect();
      scrollBy({
        top: cardSizes.top + cardSizes.height * 2,
        behavior: 'smooth',
      });
      loader.style.display = 'none';
    });
  form.reset();
}