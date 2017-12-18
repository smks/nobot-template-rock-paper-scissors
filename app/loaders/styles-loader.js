import { getConfig } from './config-loader';

const head = document.head || document.getElementsByTagName('head')[0];

const loadStyles = () => {
  const { theme, customStyles } = getConfig();

  customStyles.map((url) => {
    createCssFile(url);
  });

  // load in css for the theme
  const { path } = theme;
  createCssFile(`${path}/theme.css`);
};

const createCssFile = (url) => {
  const cssFile = document.createElement('link');
  cssFile.rel = 'stylesheet';
  cssFile.type = 'text/css';
  cssFile.href = url;
  cssFile.media = 'all';
  head.appendChild(cssFile);
};

export default loadStyles;
