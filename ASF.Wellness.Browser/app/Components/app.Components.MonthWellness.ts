import {Component, Input, Inject} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Month } from '../Model/app.Model.Month';
import { MonthYear } from '../Model/app.Model.MonthYear';
import { Observable } from 'rxjs/Observable';
import { MonthsService } from '../Services/app.Services.Months';
import { User } from '../Model/app.Model.User';

@Component({
    selector: 'month-wellness',
    templateUrl: './app/Components/app.Components.MonthWellness.html'
})
export class MonthWellnessComponent {

    currentUser: User;
    selectedUser: User;
    selectedIndex: number;
    constructor(
        private monthsService: MonthsService
    ) {
        
    }   

    ngOnInit() {

        this.selectedUser = new User();
        this.currentUser = new User();

        
    }
    
    
}