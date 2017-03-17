import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/RX';

import { Activity } from '../Model/app.Model.Activity';
import { Constants } from '../Common/app.Common.Constants';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';

@Injectable()
export class FakeApiService extends ApiServiceable {
    
    constructor(private http: Http) {
        super();
    }  

    getActivities(): Observable<Activity[]> {    
                
        var names = new Array<Activity>();

        names.push({ id: "123", name: "Hello" });
        names.push({ id: "124", name: "World" });

        return Observable.create(observer => {
            observer.next(names);
            observer.complete();
        });
        
    }

    getParticipationActivities(): Observable<ParticipationActivity[]> {
        var activities = new Array<ParticipationActivity>();

        activities.push({ id: "123", name: "Walking", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "124", name: "Running", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "125", name: "Biking", numberOfMinutes: 30, approved: false, date: new Date(), points:21, userId: "adsf", approvalId: "" });
        

        return Observable.create(observer => {
            observer.next(activities);
            observer.complete();
        });

    }
    
}

