# j2ts

> A simple java to ts generator, designed for DTO.

## Install

> npm install j2ts

_`j2ts` use `javap` to extract meta-data of your java classes. So, you need to have it in on your system (installed with jdk)._

## Js Api

```js
j2ts(path, options)
    .then(res => console.log(res));
```

* path: string = [glob](https://github.com/isaacs/node-glob#glob-primer) path to java.class(es)
* options: object
    * generateHasClass: boolean = optional, false by default, generate ts file with interface (default) or class
    * dest: string = optional, null by default, destination path to put ts files, if not set, j2ts don't write files

return a promise with an array of {name: className, str: resultTs}.

## CLI

After install, add a script in your `package.json` :

```json
{
    "scripts": {
        "j2ts": "j2ts -f \"[glob]\" -d \"path\""
    }
}
```

To see all options run `j2ts --help`

## Development

> npm run test

## Contribution

This repository ❤ pull-request ;)
