import {Component, Input, Inject} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Activity } from '../Model/app.Model.Activity';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-activity-management',
    templateUrl: './app/Components/app.Components.ActivityManagement.html'
})
export class ActivityManagementComponent {
        
    activities: Activity[];
    newActivityName: string;
    newActive: boolean;

    constructor(private apiService: ApiServiceable) {
          
    }   

    addActivity() {

        var created = new Activity();
        created.id = "asdfsa";
        created.name = "";

        this.apiService.createActivity(created);
            
    }

    ngOnInit() {

        this.apiService.getActivities().subscribe(items => this.activities = items);      
        
    }
}