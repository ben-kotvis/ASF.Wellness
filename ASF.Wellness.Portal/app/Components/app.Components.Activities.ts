import {Component, Input, Inject} from '@angular/core';
//import { ApiService, ApiServiceable } from '../Services/app.Services.Api';

import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Activity } from '../Model/app.Model.Activity';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-activities',
    templateUrl: './app/Components/app.Components.Activities.html'
})
export class ActivitiesComponent {
        
    todoEdit: any;
    title: string;
    activities: Activity[];
    participations: ParticipationActivity[];

    constructor(private apiService: ApiServiceable) {
        
        this.todoEdit = null;
        this.title = "Hello world";        
    }   

    ngOnInit() {
        this.apiService.getActivities().subscribe(items => this.activities = items);
        this.apiService.getParticipationActivities().subscribe(items => this.participations = items);
    }


}