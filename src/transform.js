const Class = require('./ast/Class');

/**
 * from array of object<constructors, fields, methods> to tsClazz
 * @param javaClazz array of object<constructors, fields, methods>
 * @returns {Promise}
 */
module.exports = (javaClazz) => {
    return new Promise((resolve) => {
        resolve(javaClazz.map(java => {
            return Class.generate(java);
        }));

    });
};
