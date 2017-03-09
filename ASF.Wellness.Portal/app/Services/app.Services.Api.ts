
import { Activity } from '../Model/app.Model.Activity';

export class ApiService {

    getActivities(): Array<Activity> {

        var activities = new Array<Activity>();

        activities.push({ name: "One", id: "" });
        activities.push({ name: "Two", id: "" });

        return activities;
    }
}

