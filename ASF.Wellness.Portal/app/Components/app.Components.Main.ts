import {Component, Input, Inject} from '@angular/core';
//import { ApiService, ApiServiceable } from '../Services/app.Services.Api';
import { User } from '../Model/app.Model.User';
import { ActivitiesComponent } from '../Components/app.Components.Activities';
import { EventsComponent } from '../Components/app.Components.Events';
import { MonthMenuComponent } from '../Components/app.Components.MonthMenu';
import { UsersComponent } from '../Components/app.Components.Users';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './app/Components/app.Components.Main.html',
    directives: [ActivitiesComponent, EventsComponent, MonthMenuComponent,UsersComponent, ROUTER_DIRECTIVES]
})
export class MainComponent {
    loginLinkMessage: string;
    currentUser: User;
    selectedUser: User;

    constructor() {
        
    }   

    ngOnInit() {
        this.loginLinkMessage = "Hello";

        this.selectedUser = new User();
        this.currentUser = new User();
    }


}