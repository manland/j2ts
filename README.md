# j2ts

> A simple java to ts generator, designed for DTO.

* [Install](#install)
* [Js Api](#js-api)
* [CLI](#cli)
* [Example](#example)
* [Development](#development)
* [Contribution](#contribution)

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

And run `npm run j2ts`. To see all options run `j2ts --help`

## Example

If you start with User java class :

```java
package dto;

public class User {

    private String username;
    private Integer stats;

    public User() {
    }

    public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

    public Integer getStats() {
        return stats;
    }

    public void setStats(Integer stats) {
        this.stats = stats;
    }
}
```

You compile it with java :

> javac "dto/User.java"

Pass `dto/User.class` through `j2ts` :

> j2ts -f "./dto/*.class" -d "./dto"

You will obtain `dto/User.ts` :

```ts
export interface User {

    username: string;

    stats: number;

}
```

And an `index.ts` containing a reference to all exported members :

```ts
export * from './User';
```

Now you can use it in your project when you request user from server :

```ts
import {User} from './dto';

fetch('myserver/user/1').then((user: User) => ...);
```

Test it against all your big, fat and complicated dto in real projects ;) And please, open issues if something goes wrong.

## Development

> clone

> npm install

> npm run test

## Contribution

This repository ❤ pull-request ;) Make sure no one else work on same feature by opening an issue!
