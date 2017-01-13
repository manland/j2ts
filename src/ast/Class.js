const Enum = require('./Enum');
const Method = require('./Method');
const Field = require('./Field');
const Util = require('./Util');
const Type = require('./Type');

module.exports.generate = (from, generateHasClass) => {
    if(from.extends.length > 0 && from.extends[0].startsWith('java.lang.Enum')) {
        return Enum.generate(from);
    }

    let {name, methods, fields, describe} = from;
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

    const generateMethods = methods.map(m => Method.generate(m, generateHasClass)).filter(m => m !== false);

    generateMethods.forEach(m => {
        m.needImports.forEach(i => {
            if(!imports.some(im => im === i)) {
                imports.push(i);
            }
        });
    });
    const importsStr = imports.length === 0 ? '' : `${imports.join('\n\n    ')}\n\n`;

    const methodStr = generateMethods.filter(m => m.str !== '').map(m => m.str).join('\n\n    ');

    const myFields = [];
    [].concat(generateMethods.map(m => m.field), fields)
        .filter(d => d !== undefined)
        .forEach(newField => {
            if(!myFields.some(m => m.name === newField.name)) {
                myFields.push(newField);
            }
        });
    const fieldsStr = `${myFields.map(f => Field.generate(f, generateHasClass).str).join('\n\n    ')}`;

    let body = ``;
    if(fieldsStr) {
        body += `    ${fieldsStr}\n\n`;
    }
    if(methodStr) {
        body += `    ${methodStr}\n\n`;
    }

    const nameWithoutPackage = Util.nameClassWithoutPackage(name);
    if(generateHasClass) {
        return {
            name: nameWithoutPackage,
            str: `${importsStr}export ${describe}class ${nameWithoutPackage}${father} {\n\n${body}}\n`
        };
    } else {
        return {
            name: nameWithoutPackage,
            str: `${importsStr}export interface ${nameWithoutPackage}${father} {\n\n${body}}\n`
        };
    }
};