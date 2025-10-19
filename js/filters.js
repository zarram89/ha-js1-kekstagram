import {renderPictures} from './pictures.js';
import {debounce} from './util.js';

const RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let originalPictures = [];

// Вспомогательные функции сортировки
const getRandomUnique = (array, count) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const sortByComments = (a, b) => b.comments.length - a.comments.length;

// Функция рендеринга в зависимости от активного фильтра
const applyFilter = (filterId, picturesData, container, template) => {
  let filtered = [];

  switch (filterId) {
    case 'filter-random':
      filtered = getRandomUnique(picturesData, RANDOM_COUNT);
      break;
    case 'filter-discussed':
      filtered = [...picturesData].sort(sortByComments);
      break;
    default:
      filtered = [...picturesData];
  }

  // очищаем предыдущие миниатюры
  container.querySelectorAll('.picture').forEach((el) => el.remove());
  // отрисовываем новые
  renderPictures(filtered, container, template);
};

// Функция для активации фильтров
export const initFilters = (picturesData, container, template) => {
  originalPictures = picturesData;

  filtersContainer.classList.remove('img-filters--inactive');

  const rerenderDebounced = debounce((id) => {
    applyFilter(id, originalPictures, container, template);
  }, RERENDER_DELAY);

  filtersContainer.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button || button.classList.contains('img-filters__button--active')) {
      return;
    }

    // обновляем активную кнопку
    filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');

    rerenderDebounced(button.id);
  });
};
