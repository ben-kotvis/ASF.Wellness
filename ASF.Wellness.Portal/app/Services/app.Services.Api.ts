import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';

import { Activity } from '../Model/app.Model.Activity';
import { Constants } from '../Common/app.Common.Constants';

@Injectable()
export class ApiService {

    constructor(private http: Http) {
    }
    

    getActivities() : Observable<Activity[]> {    
            
        var url = Constants.activitiesPath();
        
        return this.http.get(url).map(r => r.json() as Activity[]);
        

            //.map((res: Response, index: number) => res.json() as Activity[]);        
        
            //.then((res:Response) => res.json() as Activity[]);
        //.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        
    }
    
}

