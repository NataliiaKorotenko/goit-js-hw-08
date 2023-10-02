// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');

const createGalleryItemMarkup = ({ preview, original, description }) => `
<li class="gallery__item">
<a class="gallery__link" href="${original}">
   <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</li>
`;

const createGalleryMarkup = items => items.map(item => createGalleryItemMarkup(item)).join('');

gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    //docClose: false
  });

  gallery.addEventListener('click', onGalleryItemClick);

  const instance = new SimpleLightbox(element);

instance.on('close.simplelightbox', () => {
  instance.close();
});

instance.on('show.simplelightbox', () => {
  document.addEventListener('keydown', onModalKeyDown);
});

function onModalKeyDown(event) {
  if (event.key === 'Escape') {
    instance.close();
    document.removeEventListener('keydown', onModalKeyDown);
  }
}


console.log(galleryItems);
