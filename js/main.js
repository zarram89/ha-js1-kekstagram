import {getPictures, PICTURES_COUNT} from './data.js';
import {renderPictures} from './pictures.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesData = getPictures(PICTURES_COUNT);
renderPictures(picturesData, picturesListElement, pictureTemplate);
