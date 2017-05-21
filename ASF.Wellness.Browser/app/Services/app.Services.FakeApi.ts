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
export class FakeApiService extends ApiServiceable {

   _names: Activity[];

    constructor(private http: Http) {
        super();
        this._names = new Array<Activity>();

        this._names.push({ id: "150", name: "Weight lifting", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "542", name: "Winter Activities (e.g. - snowshoeing, skiing, shoveling, etc.)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12343", name: "Canoeing/Rowing", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12334", name: "Cross training", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "123322", name: "Organized Athletic Sporting Event (e.g. - basketball, volleyball, soccer, flag football)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12387", name: "Bicycling", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "123411", name: "Aerobic/Fitness Class (e.g. - spinning, zumba, boot camps, water aerobics, etc.)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1236587", name: "Racquetball", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "123611", name: "Yoga/Pilates/Stretching", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "123324", name: "Walking (Brisk)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1238444", name: "Running/Jogging", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1236688", name: "Rock Climbing", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "123311", name: "Chopping/splitting wood", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1231474", name: "Swimming", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1237111", name: "Hiking", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12378987", name: "Martial Arts", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1233444", name: "Roller Blading/Roller Skating/Ice Skating", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "1237717", name: "New Activity 2 updated", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12391338", name: "Golfing (without cart)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
        this._names.push({ id: "12371545", name: "Cardio Machines (e.g. - Stair-steppers, Elliptical, Rowing machine, etc.)", updatedBy: "Me", updatedOn: new Date(), active: true, dirty: false, });
    }  


    getActivities(): Observable<Activity[]> {    

        return Observable.create((observer: Observer<Activity[]>) => {
            observer.next(this._names);
            observer.complete();
        });
        
    }

    createActivity(activity: Activity): Observable<Activity> {

        this._names.push(activity);
        
        return Observable.create((observer: Observer<Activity>) => {
            observer.next(activity);
            observer.complete();
        });
    }

    updateActivity(activity: Activity): Observable<string> {

        var item = this._names.find((v, i, obj) => v.id == activity.id);
        item.name = activity.name;
        item.active = activity.active;
        item.dirty = false;
        
        return Observable.create((observer: Observer<string>) => {
            observer.next("Completed");
            observer.complete();
        });
    }

    deleteActivity(id: string): Observable<string> {
        var index = this._names.findIndex(i => i.id == id);
        this._names.splice(index, 1);

        return Observable.create((observer: Observer<string>) => {
            observer.next("Completed");
            observer.complete();
        });
    }

    getParticipationActivities(month: number, year: number): Observable<ParticipationActivity[]> {
        var activities = new Array<ParticipationActivity>();

        activities.push({ id: "123", name: "Walking", numberOfMinutes: 30, approved: false, date: new Date(year, month, 2), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "124", name: "Running", numberOfMinutes: 30, approved: false, date: new Date(year, month, 2), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "125", name: "Biking", numberOfMinutes: 30, approved: false, date: new Date(year, month, 2), points:21, userId: "adsf", approvalId: "" });
        

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

        events.push({ id: "123", name: "Walking", fileId: "", approved: false, date: new Date(year, month, 2), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "124", name: "Running", fileId: "", approved: false, date: new Date(year, month, 2), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "125", name: "Biking", fileId: "", approved: false, date: new Date(year, month, 2), points: 21, userId: "adsf", approvalId: "" });


        return Observable.create((observer: Observer<ParticipationEvent[]>) => {
            observer.next(events);
            observer.complete();
        });
    }
    
}

