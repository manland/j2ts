const Type = require('./Type');

module.exports.generate = (from, generateHasClass) => {
    let {ret, name, args} = from;

    let field, body = '', needImports = [];
    if(isSetter(name, args) && generateHasClass) {
        const fieldName = getterSetterFieldName(name);
        field = {name: `_${fieldName}`, scope: 'private', type: args[0]};
        name = `set ${fieldName}`;
        const t = Type(args[0]);
        needImports.push(t.needImport);
        body = `this._${fieldName} = ${t.name.charAt(0).toLowerCase()};`;
        ret = '';
    } else if(isSetter(name, args) && !generateHasClass) {
        const fieldName = getterSetterFieldName(name);
        field = {name: `${fieldName}`, scope: 'public', type: args[0]};
        const t = Type(args[0]);
        needImports.push(t.needImport);
    } else if(isGetter(name, args) && generateHasClass) {
        const fieldName = getterSetterFieldName(name);
        field = {name: `_${fieldName}`, scope: 'private', type: ret};
        name = `get ${fieldName}`;
        body = `return this._${fieldName};`;
        const t = Type(ret);
        needImports.push(t.needImport);
        ret = `: ${t.name}`;
    } else if(isGetter(name, args) && !generateHasClass) {
        const fieldName = getterSetterFieldName(name);
        field = {name: `${fieldName}`, scope: 'public', type: ret};
        const t = Type(ret);
        needImports.push(t.needImport);
    }  else {
        const t = Type(ret);
        needImports.push(t.needImport);
        ret = `: ${t.name}`;
    }
    let str;
    if(generateHasClass) {
        str = `${name}(${generateArgs(args, needImports)})${ret} {\n        ${body}\n    }`;
    } else {
        str = ``;
    }
    return {
        str,
        field,
        needImports: needImports.filter(i => i !== false)
    };
};

const generateArgs = (args, needImports) => {
    return args.map((type) => {
        const t = Type(type);
        needImports.push(t.needImport);
        return `${t.name.charAt(0).toLowerCase()}: ${t.name}`;
    }).join(', ');
};

const isGetter = (name, args) => name.startsWith('get') && args.length === 0;

const isSetter = (name, args) => name.startsWith('set') && args.length === 1;

const getterSetterFieldName = name => {
    let res = name.substring(3);
    return res.charAt(0).toLowerCase() + res.slice(1);
};
