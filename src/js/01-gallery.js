import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

const createGallery = gallery => {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}"/>
        </a>
      `;
    })
    .join('');
};

const createGalleryHtml = createGallery(galleryItems);
galleryEl.insertAdjacentHTML('afterbegin', createGalleryHtml);

let gallery = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
  navText: ['&#11164', '&#11166'],
  captionPosition: 'top',
});

const captionsDataCentr = gallery.domNodes.caption;
captionsDataCentr.style.textAlign = 'center';
