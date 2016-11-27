import {Human} from './Human';

export class Male extends Human {

    private _type: string;

    get type(): string {
        return this._type;
    }

    set type(s: string) {
        this._type = s;
    }

}