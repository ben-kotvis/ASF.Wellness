import {Component, Input, Inject} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { User } from '../Model/app.Model.User';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-users',
    templateUrl: './app/Components/app.Components.Users.html'
})
export class UsersComponent {
    currentUser: User;
    users: Array<User>;
    monthOffset: number;

    constructor() {
        
    }   

    ngOnInit() {
        
        this.currentUser = new User();
    }
    
}