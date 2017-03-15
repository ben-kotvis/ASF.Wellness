import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/RX';

import { Activity } from '../Model/app.Model.Activity';
import { Constants } from '../Common/app.Common.Constants';

@Injectable()
export class ApiService {
    
    constructor(private http: Http) {
    }
    

    getActivities() : Observable<Activity[]> {    


        /*
        var url = Constants.activitiesPath();
        
        return this.http.get(url).map(r => r.json() as Activity[]);
        */

        var names = new Array<Activity>();

        names.push({ id: "123", name: "Hello" });
        names.push({ id: "124", name: "World" });

        return Observable.create(observer => {
            observer.next(names);
            observer.complete();
        });
        
    }
    
}

