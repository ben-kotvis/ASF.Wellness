


export class Month {

    public month: string;
    public year: number;
    public offset: number;
    public selected: boolean;
    constructor(
        fields?: {
            month?: string,
            year?: number,
            offset?: number,
            selected?: boolean
        }) {
        if (fields) Object.assign(this, fields);
    }
}