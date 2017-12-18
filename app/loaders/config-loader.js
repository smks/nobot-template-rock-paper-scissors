let configuration = {};

const loadConfig = () => new Promise((resolve, reject) => {
  fetch('game.json')
    .then(response => response.json())
    .then((config) => {
      configuration = config;
      resolve();
    })
    .catch(reject);
});

export const getConfig = () => configuration;

export default loadConfig;
