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
    original: string;

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
    edit(activity: Activity) {

        this.setEditing(false);

        this.original = JSON.stringify(activity);  
        activity.dirty = true;
    }

    cancelExisting(activity: Activity) {

        //console.log(activity);
        var originalItem = JSON.parse(this.original);

        activity.name = originalItem.name;
        activity.active = originalItem.active;
        activity.dirty = false;
    }
    
    setEditing(editing: boolean) {
        for (var i = 0; i < this.activities.length; i++) {
            var item = this.activities[i];
            item.dirty = editing;
        }
    }
}