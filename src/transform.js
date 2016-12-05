const Class = require('./ast/Class');

/**
 * from array of object<constructors, fields, methods> to tsClazz
 * @param javaClazz array of object<constructors, fields, methods>
 * @returns {Promise}
 */
module.exports = (javaClazz, generateHasClass) => {
    return new Promise((resolve) => {
        resolve(javaClazz.map(java => {
            return Class.generate(java, generateHasClass);
        }));

    }).then(clazz => {
        return clazz.concat(clazz.reduce((acc, current) => {
            acc.str += `export * from './${current.name}';\n`;
            return acc;
        }, {name: 'index', str: ''}));
    });
};
