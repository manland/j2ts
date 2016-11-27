import {Human} from './Human';

export class Female extends Human {

    private _type: string;

    get type(): string {
        return this._type;
    }

    set type(s: string) {
        this._type = s;
    }

}