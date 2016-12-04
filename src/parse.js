var parser = require('java-class-parser');

/**
 *
 * @param filepath
 * @returns {Promise} array of object<constructors, fields, methods>
 */
module.exports = (files) => {
    return new Promise((resolve, error) => {
        parser(files, function(err, javaClazz) {
            if(err !== null) return error(err);

            resolve(Object.keys(javaClazz).map(c => javaClazz[c]));
        });
    });
};
