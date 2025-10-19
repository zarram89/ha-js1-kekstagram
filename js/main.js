import {renderPictures} from './pictures.js';
import {renderBigPictureElement} from './big-picture.js';
import {fetchPictures} from './api.js';
import {showDataError} from './messages.js';
import {initFilters} from './filters.js';
import './upload-form.js';
import './upload-effects';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let picturesData = [];


function attachOpenHandler() {
// 1 Навешиваем только один обработчик на весь контейнер
  picturesListElement.addEventListener('click', (evt) => {
    // 2Проверяем, кликнули ли по миниатюре или по img внутри неё
    const target = evt.target.closest('.picture');

    // 3 если клик не по миниатюре — выходим
    if (!target) {
      return;
    }

    // 4 Получаем id и находим соответствующий объект
    const id = Number(target.dataset.pictureId);
    const pictureData = picturesData.find((item) => item.id === id);

    // 5 Показываем модалку с изображением
    if (pictureData) {
      renderBigPictureElement(pictureData);
    }
  });
}

async function init() {
  try {
    picturesData = await fetchPictures();
    renderPictures(picturesData, picturesListElement, pictureTemplate);
    initFilters(picturesData, picturesListElement, pictureTemplate);
    attachOpenHandler();
  } catch (e) {
    showDataError();
  }
}

await init();
