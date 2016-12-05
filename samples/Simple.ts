export class Simple {

    private _number: number;

    public string: string;

    get number(): number {
        return this._number;
    }

    set number(n: number) {
        this._number = n;
    }

}
