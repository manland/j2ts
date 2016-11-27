const Type = require('./Type');

module.exports.generate = (from) => {
    let {name, scope, type} = from;
    const t = Type(type);
    return {
        str: `${scope} ${name}: ${t.name};`,
        needImport: t.needImport
    };
};