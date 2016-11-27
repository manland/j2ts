import {Simple} from './Simple';

export class Other {

    private _simple: Simple;

    get simple(): Simple {
        return this._simple;
    }

    set simple(s: Simple) {
        this._simple = s;
    }

}