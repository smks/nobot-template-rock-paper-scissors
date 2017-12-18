// See http://brunch.io for documentation.
const { name, version } = require('./package');

const app = {};
app[`${name}-vendor.${version}.js`] = /^(?!app)/;
app[`${name}.${version}.js`] = /^app/;

exports.files = {
  javascripts: {
    joinTo: app
  },
  
  stylesheets: {joinTo: `${name}.${version}.css`}
};

exports.plugins = {
  babel: {presets: ['latest']},
  postcss: {
    processors: [
      require('csswring')(),
      require('postcss-import')(),
      require('postcss-cssnext')()
    ]
  }
};