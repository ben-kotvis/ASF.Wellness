import {Component, Input} from '@angular/core';
import { ApiService } from '../Services/app.Services.Api';
import { Activity } from '../Model/app.Model.Activity';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    providers: [ApiService]
})
export class ActivitiesComponent {
        
    todoEdit: any;
    title: string;
    activities: Activity[];

    constructor(private apiService: ApiService) {
        
        this.todoEdit = null;
        this.title = "Hello world";        
    }   

    ngOnInit() {
        this.apiService.getActivities().subscribe(items => this.activities = items);

    }


}