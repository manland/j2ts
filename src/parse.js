var parser = require('./parser/java-class-parser');

/**
 *
 * @param files
 * @returns {Promise} array of object<constructors, fields, methods>
 */
module.exports = (files) => {
    return parser(files).then(javaClazz => Object.keys(javaClazz).map(c => javaClazz[c]));
};
