const Util = require('./Util');

module.exports = (javaType) => {
    if(javaType === 'java.lang.Integer' || javaType === 'java.lang.Long' || javaType === 'java.lang.Float' || javaType === 'java.lang.Double') {
        return {needImport: false, name: 'number'};
    } else if(javaType === 'java.lang.String') {
        return {needImport: false, name: 'string'};
    } else if(javaType === 'java.lang.Boolean') {
        return {needImport: false, name: 'boolean'};
    } else if(!javaType.startsWith('java')) {
        const name = Util.nameClassWithoutPackage(javaType);
        return {needImport: `import {${name}} from './${name}';`, name: name};
    } else {
        throw new Error(`Unknow type ${javaType}`);
    }
};