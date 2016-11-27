export abstract class Human {

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(s: string) {
        this._name = s;
    }

}