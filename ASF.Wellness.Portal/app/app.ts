import {Component, bootstrap, NgFor, provide, Input} from 'angular2/angular2';
import { ApiService } from '../app/Services/app.Services.Api';
import { Activity } from '../app/Model/app.Model.Activity';
import { Http, HTTP_PROVIDERS } from 'angular2/http';


@Component({
    selector: 'home',
    directives: [NgFor],
    templateUrl: 'home.html',
    providers: [ApiService, HTTP_PROVIDERS]
})
class TodoApp {

    @Input() something;
    todoEdit: any;
    title: string;
    activities: Array<Activity>

    constructor(private http: Http, private apiService: ApiService) {

        this.something = { prop1 : "Hello" };
        this.todoEdit = null;
        this.title = "Hello world";

        this.apiService.getActivities().then(response => this.activities = response);        
    }   

}
bootstrap(TodoApp);