export class MonthYear {

    public month: number;
    public year: number;
    constructor(
        fields?: {
            month?: number,
            year?: number
        }) {
        if (fields) Object.assign(this, fields);
    }
}