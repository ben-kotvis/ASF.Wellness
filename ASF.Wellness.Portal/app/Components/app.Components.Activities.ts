import {Component, Input, Inject} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Activity } from '../Model/app.Model.Activity';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-activities',
    templateUrl: './app/Components/app.Components.Activities.html'
})
export class ActivitiesComponent {
        
    activities: Activity[];
    participations: ParticipationActivity[];
    total: number;

    constructor(private apiService: ApiServiceable) {
          
    }   

    ngOnInit() {
        this.total = 0;

        this.apiService.getActivities().subscribe(items => this.activities = items);
        this.apiService.getParticipationActivities().subscribe(items => {
            this.participations = items;
            this.participations.forEach(s => this.total += s.points);
        });
        
    }


}