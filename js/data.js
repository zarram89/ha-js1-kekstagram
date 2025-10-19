import {getRandomInteger, getRandomArrayElement} from './util.js';

const PICTURES_COUNT = 25;
const NAMES = [
  'Саша',
  'Паша',
  'Вася',
  'Рома',
  'Кирилл',
  'Аня',
  'Маша',
  'Олег',
  'Ира',
  'Лена',
  'Денис',
  'Таня',
  'Никита',
  'Юля',
  'Стас',
  'Катя',
  'Женя',
  'Вика',
  'Илья',
  'Дима',
];
const DESCRIPTIONS = [
  'Закат на берегу — просто волшебство!',
  'Лучший день этого лета 🌞',
  'Экспериментировал с новым объективом.',
  'Кофе, утро и полное спокойствие ☕',
  'Не ожидал, что фото так зайдёт!',
  'Случайный кадр, но любимый 📸',
  'Поймал момент, когда все смеялись!',
  'Город просыпается вместе со мной.',
  'Снято на старенький телефон, но атмосферно.',
  'Мой кот снова украл кадр 😸',
  'Поездка, которую никогда не забуду 🚗',
  'Чистое небо и шум ветра — идеальный день.',
  'Снято в один дубль, без фильтров.',
  'Сколько тепла в этом кадре!',
  'Когда просто вышел за хлебом, а получилось искусство.',
  'Море, солнце и полное спокойствие 🌊',
  'Тестировал новую камеру, и вот результат!',
  'Настоящее счастье в мелочах.',
  'Кто-то сказал улыбнись — и я нажал на спуск.',
  'Да, это было спонтанно 😅',
];
const COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ]
;
const LIKES_COUNT = {
  min: 15,
  max: 200,
};
const COMMENTS_COUNT = {
  min: 0,
  max: 30,
};
const AVATAR_COUNT = {
  min: 1,
  max: 6,
}
const MESSAGE_COUNT = {
  min: 1,
  max: 2,
};

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(AVATAR_COUNT.min, AVATAR_COUNT.max)}.svg`,
  message: Array.from({length: getRandomInteger(MESSAGE_COUNT.min, MESSAGE_COUNT.max)}, () => getRandomArrayElement(COMMENTS)).join(' '),
  name: getRandomArrayElement(NAMES),
})

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT.min, LIKES_COUNT.max),
  comments: Array.from({length: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max)}, (_comment, commentId) => createComment(commentId + 1)),

});

const createPictures = (picturesCount) => Array.from({length: picturesCount}, (_picture, pictureId) => createPicture(pictureId + 1));

const getPictures = (picturesCount) => createPictures(picturesCount);

export {getPictures, PICTURES_COUNT};
