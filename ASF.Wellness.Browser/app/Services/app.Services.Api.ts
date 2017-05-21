import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'; 
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/RX';

import { Activity } from '../Model/app.Model.Activity';
import { Constants } from '../Common/app.Common.Constants';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { Event } from '../Model/app.Model.Event';
import { ParticipationEvent } from '../Model/app.Model.ParticipationEvent';

@Injectable()
export class ApiService extends ApiServiceable {
    
    constructor(private http: Http) {
        super();
    }  

    getActivities() : Observable<Activity[]> {    
        
        var url = Constants.activitiesPath();
        
        return this.http.get(url).map(r => r.json() as Activity[]);     
        
    }
    
    createActivity(activity: Activity): Observable<Activity> {
        
        return Observable.create((observer: Observer<Activity[]>) => {
        
            observer.complete();
        });
    }

    getParticipationActivities(month: number, year: number): Observable<ParticipationActivity[]> {
        var activities = new Array<ParticipationActivity>();

        activities.push({ id: "123", name: "Walking", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "124", name: "Running", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "125", name: "Biking", numberOfMinutes: 30, approved: false, date: new Date(), points: 21, userId: "adsf", approvalId: "" });


        return Observable.create((observer: Observer<ParticipationActivity[]>) => {
            observer.next(activities);
            observer.complete();
        });

    }

    getEvents(): Observable<Event[]> {
        var names = new Array<Event>();

        names.push({ id: "123", name: "Hello" });
        names.push({ id: "124", name: "World" });

        return Observable.create((observer: Observer<Event[]>) => {
            observer.next(names);
            observer.complete();
        });
    }

    getParticipationEvents(month: number, year: number): Observable<ParticipationEvent[]> {
        var events = new Array<ParticipationEvent>();

        events.push({ id: "123", name: "Walking", fileId: "", approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "124", name: "Running", fileId: "", approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "125", name: "Biking", fileId: "", approved: false, date: new Date(), points: 21, userId: "adsf", approvalId: "" });


        return Observable.create((observer: Observer<ParticipationEvent[]>) => {
            observer.next(events);
            observer.complete();
        });
    }
}

