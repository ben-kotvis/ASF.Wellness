


export class Month {

    public monthName: string;
    public month: number;
    public year: number;
    public offset: number;
    public selected: boolean;
    constructor(
        fields?: {
            monthName?: string,
            month?: number,
            year?: number,
            offset?: number,
            selected?: boolean
        }) {
        if (fields) Object.assign(this, fields);
    }
}