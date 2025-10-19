// import noUiSlider from '../vendor/nouislider/nouislider.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

// Настройки эффектов
const EFFECTS = {
  none: {
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const uploadPreview = document.querySelector('.img-upload__preview img');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValue = sliderContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect = EFFECTS.none;

// === Масштаб ===
const setScale = (value) => {
  uploadPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const changeScale = (delta) => {
  const current = parseInt(scaleValue.value, 10);
  const newValue = Math.min(SCALE_MAX, Math.max(SCALE_MIN, current + delta));
  setScale(newValue);
};

scaleSmaller.addEventListener('click', () => changeScale(-SCALE_STEP));
scaleBigger.addEventListener('click', () => changeScale(SCALE_STEP));

// === Эффекты ===
noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: currentEffect.min, max: currentEffect.max },
    step: currentEffect.step,
    start: currentEffect.max,
  });
  if (currentEffect === EFFECTS.none) {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

effectsList.addEventListener('change', (evt) => {
  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];
  updateSlider();
  applyEffect(currentEffect.max);
});

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  applyEffect(value);
});

function applyEffect(value) {
  if (currentEffect.filter === 'none') {
    uploadPreview.style.filter = 'none';
  } else {
    uploadPreview.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
  }
  effectValue.value = value;
}

// === Сброс при открытии новой формы ===
export const resetEffects = () => {
  currentEffect = EFFECTS.none;
  uploadPreview.style.filter = 'none';
  sliderContainer.classList.add('hidden');
  setScale(DEFAULT_SCALE);
};
