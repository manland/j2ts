var parser = require('java-class-parser');

/**
 *
 * @param filepath
 * @returns {Promise} array of object<constructors, fields, methods>
 */
module.exports = (filepath) => {
    return new Promise((resolve, error) => {
        const files = Array.isArray(filepath) ? filepath : [filepath];
        parser(files, function(err, javaClazz) {
            if(err !== null) return error(err);

            resolve(Object.keys(javaClazz).map(c => javaClazz[c]));
        });
    });
};
