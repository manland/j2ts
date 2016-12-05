const Util = require('./Util');

module.exports.generate = (from) => {
    const {name, fields} = from;

    const nameWithoutPackage = Util.nameClassWithoutPackage(name);
    return {
        name: nameWithoutPackage,
        str: `export type ${nameWithoutPackage} = ${fields.map(f => `'${f.name}'`).join(` | `)};\n`
    };
};