const createPictureElement = (pictureData, template) => {
  const pictureElement = template.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');
  img.src = pictureData.url;
  img.alt = pictureData.description;
  pictureElement.querySelector('.picture__comments').textContent =
    pictureData.comments.length;
  pictureElement.querySelector('.picture__likes').textContent =
    pictureData.likes;
  return pictureElement;
};

const renderPictures = (picturesData, container, template) => {
  if (!picturesData?.length) return;
  const fragment = document.createDocumentFragment();
  const elements = picturesData.map((data) => createPictureElement(data, template));
  fragment.append(...elements);
  container.append(fragment);
  return elements;
};

export {renderPictures};
