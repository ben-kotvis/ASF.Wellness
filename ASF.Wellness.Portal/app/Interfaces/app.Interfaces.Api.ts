import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Activity } from '../Model/app.Model.Activity';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';

@Injectable()
export abstract class ApiServiceable {
    abstract getActivities(): Observable<Activity[]>;
    abstract getParticipationActivities(): Observable<ParticipationActivity[]>;
}



