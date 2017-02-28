declare module 'j2ts' {

    function j2ts(filepath: string, conf: {generateHasClass?: boolean, dest?: string}): Promise<Array<{name: string, str: string}>>;

    namespace j2ts {}

    export = j2ts;

}