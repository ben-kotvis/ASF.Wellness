import { Activity } from '../Model/app.Model.Activity';
import { Constants } from '../Common/app.Common.Constants';
import { Http } from 'angular2/http';
import { Injectable } from 'angular2/core';

@Injectable()
export class ApiService {

    constructor(private http: Http) {
    }
    

    getActivities(): Promise<Activity[]> {    

        return this.http.get(Constants.activitiesPath())
            .toPromise()
            .then(response => response.json() as Activity[])
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

