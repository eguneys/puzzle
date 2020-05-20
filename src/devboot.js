require('./index.css');

const main = require('./main');
const Tests = require('./chess/test');

module.exports = main.app;
module.exports.Tests = Tests.default;
