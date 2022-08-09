// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryImgListRef = document.querySelector('div.gallery');

const galleryItemsMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item" href=${original}>
  <img class="gallery__image" src=${preview} alt="${description}" />
</a>`;
  })
  .join('');

galleryImgListRef.insertAdjacentHTML('afterbegin', galleryItemsMarkup);
var lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  /* options */
});
console.log(galleryItems);
