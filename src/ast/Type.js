const Util = require('./Util');

const primitifsType = {
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

    'java.util.ArrayList': 'Array'
};

const regexpComposed = /([^<]+)<([^>]+)>/;

const find = (javaType) => {
    console.log('Type', javaType);
    if(primitifsType[javaType]) {
        return {needImport: false, name: primitifsType[javaType]};
    } else {
        const match = regexpComposed.exec(javaType);
        if(match) {
            const first = find(match[1]);
            const second = find(match[2]);
            const needImport = [first.needImport, second.needImport].reduce((acc, current) => {
                if(current !== false && acc === false) {
                    acc = current;
                } else if(current !== false) {
                    acc += current;
                }
                return acc;
            }, false);
            return {needImport: needImport, name: `${first.name}<${second.name}>`};
        } else if(!javaType.startsWith('java')) {
            const name = Util.nameClassWithoutPackage(javaType);
            return {needImport: `import {${name}} from './${name}';`, name: name};
        } else {
            throw new Error(`Unknow type ${javaType}`);
        }
    }
};

module.exports = find;