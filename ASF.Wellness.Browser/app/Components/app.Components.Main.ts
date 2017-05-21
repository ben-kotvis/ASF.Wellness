import {Component, Input, Inject} from '@angular/core';
//import { ApiService, ApiServiceable } from '../Services/app.Services.Api';
import { User } from '../Model/app.Model.User';
import { ActivitiesComponent } from '../Components/app.Components.Activities';
import { EventsComponent } from '../Components/app.Components.Events';
import { MonthMenuComponent } from '../Components/app.Components.MonthMenu';
import { UsersComponent } from '../Components/app.Components.Users';


@Component({
    selector: 'app-main',
    templateUrl: './app/Components/app.Components.Main.html'
})
export class MainComponent {
    loginLinkMessage: string;

    constructor() {
        
    }   

    ngOnInit() {
        this.loginLinkMessage = "Hello";

    }


}