const load = require('./src/load');
const parse = require('./src/parse');
const transform = require('./src/transform');
const write = require('./src/write');

module.exports = (filepath, options = {generateHasClass: false, dest: null}) => {
    return load(filepath)
        .then(parse)
        .then(res => transform(res, options.generateHasClass))
        .then(res => options.dest ? write(res, options.dest) : res);
};
