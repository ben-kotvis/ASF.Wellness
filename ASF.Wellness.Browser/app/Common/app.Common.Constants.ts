export class Constants {

    public static BASE_URL: string = "http://localhost:8512";
    public static ACTIVITIES_PATH: string = "/api/activities";

    constructor() {
    
    }

    static activitiesPath(): string {
        return Constants.BASE_URL.concat(Constants.ACTIVITIES_PATH);
    }
}