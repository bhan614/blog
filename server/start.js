require("babel-core/register")({
  presets:['es2015', 'stage-0']
});
require("babel-polyfill");

module.export = require('./test.js');
