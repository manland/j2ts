const Type = require('./Type');

module.exports.generate = (from, generateHasClass) => {
    let {name, scope, type} = from;
    const t = Type(type);
    return {
        str: `${generateHasClass ? `${scope} ` : ''}${name}: ${t.name};`,
        needImport: t.needImport
    };
};