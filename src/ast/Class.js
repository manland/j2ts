const Method = require('./Method');
const Field = require('./Field');
const Util = require('./Util');
const Type = require('./Type');

module.exports.generate = (from) => {
    let {name, scope, methods, fields, describe} = from;
    const imports = [];

    if(describe) {
        describe = `${describe} `;// abstract
    }

    let father = '';
    if(from.extends.length > 0) {
        father = ` extends ${from.extends.map(e => {
            const t = Type(e);
            imports.push(t.needImport);
            return t.name;
        }).join(', ')}`;
    }

    const generateMethods = methods.map(m => Method.generate(m));

    generateMethods.forEach(m => {
        m.needImports.forEach(i => {
            if(!imports.some(im => im === i)) {
                imports.push(i);
            }
        });
    });
    const importsStr = imports.length === 0 ? '' : `${imports.join('\n\n    ')}\n\n`;

    const methodStr = generateMethods.map(m => m.str).join('\n\n    ');

    const myFields = [];
    [].concat(generateMethods.map(m => m.field), fields)
        .filter(d => d !== undefined)
        .forEach(newField => {
            if(!myFields.some(m => m.name === newField.name)) {
                myFields.push(newField);
            }
        });
    const fieldsStr = `${myFields.map(f => Field.generate(f).str).join('\n\n    ')}`;

    let body = ``;
    if(fieldsStr) {
        body += `    ${fieldsStr}\n\n`;
    }
    if(methodStr) {
        body += `    ${methodStr}\n\n`;
    }

    const nameWithoutPackage = Util.nameClassWithoutPackage(name);
    return {
        name: nameWithoutPackage,
        str: `${importsStr}export ${describe}class ${nameWithoutPackage}${father} {\n\n${body}}\n`
    };
};