const spawn = require('child_process').spawn;

module.exports = function(files) {
    return new Promise((resolve, reject) => {
        files = files || [];

        files = files.filter(file => /\.class$/.test(file));

        let output = '';
        let error = '';
        const child = spawn('javap', ['-public'].concat(files));

        child.stdout.on('data', data => output += '' + data);
        child.stderr.on('data', data => error += '' + data);

        child.on('close', code => {
            if (code !== 0) {
                return reject(Object.assign(new Error(error), {code}));
            }

            resolve(outputParser(output));
        });
    });
};


const typeRegex = '[a-zA-Z0-9\\.<>\\?\\$\\[\\],]+';
const classRegex = new RegExp(`(?:(public|private|protected) )?((?:(?:static|abstract|final) ?)*)(class|interface) (${typeRegex}) (?:extends ((?:${typeRegex}),?)+ )?(?:implements ((?:[a-zA-Z0-9\\.<>\\?\\$])+,?)+ )?{([^}]+)}`, 'gm');
const methodRegex = new RegExp(`(?:(public|private|protected) )?((?:static|abstract|final) ?)*(?:(${typeRegex}) )?([a-zA-Z]+)\\(([^\\)]*)\\)`);
const fieldRegex = new RegExp(`(?:(public|private|protected) )?((?:(?:static|abstract|final) ?)*)(${typeRegex}) ([a-zA-Z0-9_]+)`);

function outputParser(output) {
    const rs = {};
    let or = classRegex.exec(output);

    while(or) {
        const scope = or[1] || 'package';
        const describe = or[2];
        const type = or[3];
        const className = or[4];
        const exts = or[5];
        const impls = or[6];
        const classBody = or[7].split('\n').filter(Boolean).map(trimStr);
        const clz = {
            name: className,
            type: type,
            scope: scope,
            describe: (describe || '').trim(),
            'extends': exts ? exts.split(',').map(trimStr) : [],
            'implements': impls ? impls.split(',').map(trimStr) : [],
            constructors: [],
            fields: [],
            methods: []
        };

        classBody.forEach(member => {
            if(member.includes('<')) {
                member = member.replace(/<(.*)>/, (match) => match.split(', ').join(','));
            }
            let signature = methodRegex.exec(member);
            if (!signature)  {
                signature = fieldRegex.exec(member);
                if (signature) {
                    const scope = signature[1] || 'package';
                    const describe = (signature[2] || '').trim();
                    const type = signature[3];
                    const name = signature[4];
                    clz.fields.push({
                        name: name,
                        scope: scope,
                        type: type,
                        describe: describe
                    });
                }

                return;
            }

            const scope = signature[1] || 'package';
            const describe = (signature[2] || '').trim();
            const retVal = signature[3];
            const name = signature[4];
            const args = signature[5];
            if (retVal == undefined) { // no ret, constructor
                const cons = {
                    scope: scope,
                    name: name,
                    describe: describe,
                    args: args ? args.split(',').map(trimStr) : []
                };

                clz.constructors.push(cons);
            } else {
                const m = {
                    scope: scope,
                    describe: describe,
                    ret: retVal,
                    name: name,
                    args: args ? args.split(',').map(trimStr) : []
                };

                clz.methods.push(m);
            }
        });

        rs[className] = clz;

        or = classRegex.exec(output);
    }

    return rs;
}



function trimStr(str) {
    return str.trim();
}
