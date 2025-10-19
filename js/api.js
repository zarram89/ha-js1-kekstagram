const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: '❌ Не удалось загрузить данные. Попробуйте обновить страницу.',
  SEND_DATA: '❌ Не удалось отправить форму. Попробуйте ещё раз.',
};

const TIMEOUT = 15000;

const withTimeout = (promise, ms = TIMEOUT) => {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Превышено время ожидания ответа от сервера')), ms)
  );
  return Promise.race([promise, timer]);
};

const request = async (route, method = Method.GET, body = null, errorText = null) => {
  try {
    const response = await withTimeout(fetch(`${BASE_URL}${route}`, { method, body }));

    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(errorText ?? error.message);
  }
};

const fetchPictures = () => request(Route.GET_DATA, Method.GET, null, ErrorText.GET_DATA);

const uploadPicture = (body) => request(Route.SEND_DATA, Method.POST, body, ErrorText.SEND_DATA);

export {fetchPictures, uploadPicture};
