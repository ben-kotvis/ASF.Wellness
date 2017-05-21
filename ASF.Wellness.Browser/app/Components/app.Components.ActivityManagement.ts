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
    editingActivity: Activity;

    constructor(private apiService: ApiServiceable) {
          
    }   

    addActivity() {

        var created = new Activity();
        created.name = this.newActivityName;
        created.active = this.newActive;
        created.dirty = false;
        created.updatedBy = "bkotvis";
        created.updatedOn = new Date();

        this.apiService.createActivity(created);
            
    }

    ngOnInit() {

        this.newActive = true;
        this.apiService.getActivities().subscribe(items => this.activities = items);      

        this.editingActivity = new Activity();
        
    }
    edit(activity: Activity) {

        this.setEditing();

        this.original = JSON.stringify(activity);  
        activity.dirty = true;

        this.editingActivity = activity;
    }

    delete(activity: Activity) {
        this.apiService.deleteActivity(activity.id);
    }

    saveExisting(activity: Activity) {

        this.apiService.updateActivity(activity);
        activity.dirty = false;
    }

    cancelExisting(activity: Activity) {

        //console.log(activity);
        var originalItem = JSON.parse(this.original);

        activity.name = originalItem.name;
        activity.active = originalItem.active;
        activity.dirty = false;

        this.setEditing();
    }
    
    setEditing() {
        for (var i = 0; i < this.activities.length; i++) {
            var item = this.activities[i];
            item.dirty = false;
        }
        this.editingActivity = new Activity();
    }
}