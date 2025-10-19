import { getPictures, PICTURES_COUNT } from './data.js';
import { renderPictures } from './pictures.js';
import { renderBigPictureElement } from './big-picture.js';
import './upload-form.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesData = getPictures(PICTURES_COUNT);

// 1️⃣ Рендерим все миниатюры
renderPictures(picturesData, picturesListElement, pictureTemplate);

// 2️⃣ Навешиваем только один обработчик на весь контейнер
picturesListElement.addEventListener('click', (evt) => {
  // Проверяем, кликнули ли по миниатюре или по img внутри неё
  const target = evt.target.closest('.picture');

  // если клик не по миниатюре — выходим
  if (!target) return;

  // 3️⃣ Получаем id и находим соответствующий объект
  const id = Number(target.dataset.pictureId);
  const pictureData = picturesData.find((item) => item.id === id);

  // 4️⃣ Показываем модалку с изображением
  renderBigPictureElement(pictureData);
});
