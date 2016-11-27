const load = require('./src/load');
const parse = require('./src/parse');
const transform = require('./src/transform');
const write = require('./src/write');

module.exports = (filepath, dest) => {
    return load(filepath)
        .then(parse)
        .then(transform)
        .then(res => dest ? write(res, dest) : res);
};
