import {renderPictures} from './pictures.js';
import {renderBigPictureElement} from './big-picture.js';
import {fetchPictures} from './api.js';
import {showDataError} from './messages.js';
import './upload-form.js';
import './upload-effects'

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filters = document.querySelector('.img-filters');

let picturesData = [];

function activateFilters() {
  filters.classList.remove('img-filters--inactive');
  // фильтры позже (дребезг 500 мс по ТЗ)
}

function attachOpenHandler() {
// 1 Навешиваем только один обработчик на весь контейнер
  picturesListElement.addEventListener('click', (evt) => {
    // Проверяем, кликнули ли по миниатюре или по img внутри неё
    const target = evt.target.closest('.picture');

    // 2 если клик не по миниатюре — выходим
    if (!target) return;

    // 3️ Получаем id и находим соответствующий объект
    const id = Number(target.dataset.pictureId);
    const pictureData = picturesData.find((item) => item.id === id);

    // 4️ Показываем модалку с изображением
    if (pictureData) renderBigPictureElement(pictureData);
  });
}

async function init() {
  try {
    picturesData = await fetchPictures();
    renderPictures(picturesData, picturesListElement, pictureTemplate);
    activateFilters();
    attachOpenHandler();
  } catch (e) {
    console.error('Load error:', e);
    showDataError();
  }
}

init();
