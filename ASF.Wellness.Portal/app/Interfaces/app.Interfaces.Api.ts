import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Activity } from '../Model/app.Model.Activity';
import { Event } from '../Model/app.Model.Event';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { ParticipationEvent } from '../Model/app.Model.ParticipationEvent';

@Injectable()    
export abstract class ApiServiceable {
    abstract getActivities(): Observable<Activity[]>;
    abstract getParticipationActivities(): Observable<ParticipationActivity[]>;
    abstract getEvents(): Observable<Event[]>;
    abstract getParticipationEvents(): Observable<ParticipationEvent[]>;
}



