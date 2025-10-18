import {isEscapeKey, toggleClass} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureElement.querySelector('.social__caption');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotal = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const toggleModal = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

function onDocumentEscKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const closeBigPicture = () => {
  toggleModal();
  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

closeButton.addEventListener('click', closeBigPicture);

const renderBigPictureElement = (pictureData) => {
  document.addEventListener('keydown', onDocumentEscKeyDown);
  toggleModal();

  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentCount.textContent = pictureData.comments.length;
  commentTotal.textContent = pictureData.comments.length;
  bigPictureCaption.textContent = pictureData.description;

  commentsContainer.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pictureData.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    fragment.append(li);
  });
  commentsContainer.append(fragment);

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
};

export {renderBigPictureElement};

