import {isEscapeKey} from './util.js';
import {resetEffects} from './upload-effects.js'

// Константы и элементы
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const body = document.body;

// Настройка Pristine
const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
};

const pristine = new Pristine(uploadForm, pristineConfig);

// Валидация хэштегов
const MAX_HASHTAGS = 5;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // пустое поле — валидно
  }

  const hashtags = value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  // 1️⃣ Проверка количества
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  // 2️⃣ Проверка формата
  const hasInvalid = hashtags.some((tag) => !HASHTAG_PATTERN.test(tag));
  if (hasInvalid) {
    return false;
  }

  // 3️⃣ Проверка уникальности
  const hasDuplicates = hashtags.some((tag, i, arr) => arr.indexOf(tag) !== i);
  if (hasDuplicates) {
    return false;
  }

  return true;
};

// Сообщение об ошибке
const getHashtagErrorMessage = (value) => {
  if (!value.trim()) return '';
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return 'Не больше 5 хэштегов';
  }

  if (hashtags.some((tag) => !HASHTAG_PATTERN.test(tag))) {
    return 'Хэштег должен начинаться с # и содержать только буквы и цифры (до 20 символов)';
  }

  const lower = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lower).size !== lower.length) {
    return 'Хэштеги не должны повторяться';
  }

  return '';
};

// Валидация комментария
const validateComment = (value) => value.length <= 140;

// Регистрация валидаторов
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);
pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не должен превышать 140 символов'
);

// Открытие / закрытие формы
const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
}

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);

  // Сбрасываем всё состояние
  uploadForm.reset(); // сброс всех полей
  pristine.reset();   // сброс ошибок
  resetEffects(); // сброс эффектов с формы загрузки фото
};

// Обработчики клавиатуры
function onDocumentKeyDown(evt) {
  // Блокируем закрытие, если фокус в полях
  if (isEscapeKey(evt) &&
    document.activeElement !== hashtagsInput &&
    document.activeElement !== commentInput) {
    evt.preventDefault();
    closeUploadModal();
  }
}

// Обработчики событий
uploadInput.addEventListener('change', () => {
  openUploadModal();
});

uploadCancelButton.addEventListener('click', () => {
  closeUploadModal();
});

// Блокировка Esc при фокусе внутри полей
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
commentInput.addEventListener('keydown', (evt) => evt.stopPropagation());

// Отправка данных формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // Пока по ТЗ — просто отправляем стандартным способом
    uploadForm.submit();
  }
});
