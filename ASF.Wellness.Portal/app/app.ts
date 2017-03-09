import {Component, bootstrap, NgFor, provide, Input} from 'angular2/angular2';
import {ApiService} from '../app/Services/app.Services.Api';
import { Activity } from '../app/Model/app.Model.Activity';

@Component({
    selector: 'home',
    directives: [NgFor],
    templateUrl: 'home.html',
    providers: [ApiService]
})
class TodoApp {

    @Input() something;
    todoEdit: any;
    title: string;
    activities: Array<Activity>

    constructor(apiService: ApiService) {

        this.something = { prop1 : "Hello" };
        this.todoEdit = null;
        this.title = "Hello world";

        this.activities = apiService.getActivities();
    }

}
bootstrap(TodoApp);