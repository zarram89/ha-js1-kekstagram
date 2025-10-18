import {isEscapeKey, toggleClass} from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureElement.querySelector('.social__caption');
const likesCount = bigPictureElement.querySelector('.likes-count');
const shownCommentsCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureElement.querySelector('.social__comments');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let comments = [];
let shownCommentsCount = 0;

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

const onCommentsLoaderClick = () => {
  renderNextComments();
};

const renderNextComments = () => {
  const start = shownCommentsCount;
  const end = Math.min(start + COMMENTS_STEP, comments.length);
  const nextComments = comments.slice(start, end);

  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragment.append(commentElement);
  });

  commentsContainer.append(fragment);
  shownCommentsCount = end;

  // 🔹 Обновляем счётчик
  shownCommentsCountElement.textContent = shownCommentsCount;
  commentTotalCount.textContent = comments.length;

  // 🔹 Если всё показано — скрываем кнопку
  if (shownCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

const renderBigPictureElement = (pictureData) => {
  document.addEventListener('keydown', onDocumentEscKeyDown);
  toggleModal();

  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  bigPictureCaption.textContent = pictureData.description;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentsContainer.innerHTML = '';
  comments = pictureData.comments;
  shownCommentsCount = 0;
  renderNextComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

closeButton.addEventListener('click', closeBigPicture);

export {renderBigPictureElement};

