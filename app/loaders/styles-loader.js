import { getConfig } from './config-loader';

const head = document.head || document.getElementsByTagName('head')[0];

const createCssFile = (url) => {
  const cssFile = document.createElement('link');
  cssFile.rel = 'stylesheet';
  cssFile.type = 'text/css';
  cssFile.href = url;
  cssFile.media = 'all';
  head.appendChild(cssFile);
};

const loadStyles = () => {
  const { theme } = getConfig();
  const { customStyles } = theme;
  customStyles.map(url => createCssFile(url));

  // load in css for the theme
  const { path } = theme;
  createCssFile(`${path}/theme.css`);
};

export default loadStyles;
