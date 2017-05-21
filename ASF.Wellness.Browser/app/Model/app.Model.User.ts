
export class User {

    public isAdministrator: boolean;
    public firstName: string;
    public lastName: string;
    public averagePointsPerMonth: number;
    public annualTotal: number;

    constructor() {
        this.isAdministrator = true;
        this.firstName = "Ben";
        this.lastName = "Kotvis";
        this.averagePointsPerMonth = 4;
        this.annualTotal = 12;
    }
}