// See http://brunch.io for documentation.
const { name, version } = require('./package');

const app = {};
app[`core/${name}-vendor.${version}.js`] = /^(?!app)/;
app[`core/${name}.${version}.js`] = /^app/;

exports.files = {
  javascripts: {
    joinTo: app
  },
  
  stylesheets: {joinTo: `core/${name}.${version}.css`}
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