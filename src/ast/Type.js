const Util = require('./Util');

const primitivesType = {
    'void': 'void',

    'int': 'number',
    'java.lang.Integer': 'number',
    'long': 'number',
    'java.lang.Long': 'number',
    'float': 'number',
    'java.lang.Float': 'number',
    'double': 'number',
    'java.lang.Double': 'number',

    'java.lang.String': 'string',
    'boolean': 'boolean',
    'java.lang.Boolean': 'boolean',

    'java.time.LocalDate': 'string',
    'java.time.LocalDateTime': 'string',

    'java.util.Collection': 'Array',
    'java.util.List': 'Array',
    'java.util.ArrayList': 'Array',
    'java.util.Iterator': 'Array',
    'java.util.Set': 'Array',

    'java.util.Map': 'Map',
    'java.util.HashMap': 'Map'
};

const regexpComposed = /([^<]+)<([^>]+)>/;

const find = (javaType) => {
    if(primitivesType[javaType]) {
        return {needImport: false, name: primitivesType[javaType]};
    } else {
        const match = regexpComposed.exec(javaType);
        if(match) {
            const first = find(match[1]);
            const seconds = match[2].split(',').map(f => find(f.trim()));
            const needImport = seconds.concat(first).reduce((acc, current) => {
                if(current.needImport !== false && acc === false) {
                    acc = current.needImport;
                } else if(current.needImport !== false) {
                    acc += current.needImport;
                }
                return acc;
            }, false);
            return {needImport: needImport, name: `${first.name}<${seconds.map(c => c.name).join(', ')}>`};
        } else if(!javaType.startsWith('java')) {
            const name = Util.nameClassWithoutPackage(javaType);
            return {needImport: `import {${name}} from './${name}';`, name: name};
        } else {
            throw new Error(`Unknow type ${javaType}`);
        }
    }
};

module.exports = find;