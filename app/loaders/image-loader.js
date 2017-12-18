import { getConfig } from './config-loader';

const imageElements = {};

const loadImage = (imageSource, id) => new Promise((resolve, reject) => {
  const img = new Image();
  img.id = id;
  img.className = 'choice';
  img.src = imageSource;
  img.dataset.choice = id;
  img.onload = () => {
    imageElements[id] = img;
    resolve();
  };
});

const loadImages = () => {
  const { theme, images } = getConfig();
  const { path } = theme;

  if (images.length === 0) {
    console.warn('No images passed in');
    return;
  }

  const imagesToLoad = [];

  Object.keys(images).map((key, index) => {
    const img = `${path}/${images[key]}`;
    imagesToLoad.push(loadImage(img, key));
  });

  return Promise.all(imagesToLoad);
};

const getImageElements = () => imageElements;

export { loadImages, getImageElements };
