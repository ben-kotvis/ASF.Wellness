import {Component, Input} from '@angular/core';
import { ApiService } from '../Services/app.Services.Api';
import { Activity } from '../Model/app.Model.Activity';


@Component({
    selector: 'home',
    templateUrl: 'home.html',
    providers: [ApiService]
})
export class ActivitiesComponent {
        
    todoEdit: any;
    title: string;
    activities: Array<Activity>

    constructor(private apiService: ApiService) {
        
        this.todoEdit = null;
        this.title = "Hello world";

        this.apiService.getActivities()            
            .subscribe(
            response => this.activities = response,
            error => console.error('Error: ' + error),
            () => console.log('Completed!'));      
    }   

}