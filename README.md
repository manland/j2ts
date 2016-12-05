# j2ts

> A simple java to ts generator, designed for DTO.

## Install

> npm install j2ts

_`j2ts` use [java-class-parser](https://github.com/villadora/java-class-parser) ==> you need to have `javap` in your path._

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

## Development

> npm run test

## Roadmap

* add a cli
* use package to write file in directories (not flattened)

## Contribution

This repository ❤ pull-request ;)
