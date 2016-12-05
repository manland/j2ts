const Util = require('./Util');

module.exports.generate = (from) => {
    let {name, fields} = from;
    console.log(from);

    const nameWithoutPackage = Util.nameClassWithoutPackage(name);
    return {
        name: nameWithoutPackage,
        str: `export type ${nameWithoutPackage} = ${fields.map(f => `'${f.name}'`).join(` | `)};\n`
    };
};