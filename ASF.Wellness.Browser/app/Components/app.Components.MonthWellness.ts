import { Component, Input, Inject, OnInit} from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Month } from '../Model/app.Model.Month';
import { MonthYear } from '../Model/app.Model.MonthYear';
import { Observable } from 'rxjs/Observable';
import { MonthsService } from '../Services/app.Services.Months';
import { User } from '../Model/app.Model.User';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'month-wellness',
    templateUrl: './app/Components/app.Components.MonthWellness.html'
})
export class MonthWellnessComponent implements OnInit {

    currentUser: User;
    selectedUser: User;
    selectedIndex: number;
    participations: ParticipationActivity[];

    constructor(
        private apiService: ApiServiceable,
        private monthsService: MonthsService,
        private route: ActivatedRoute,
        private router: Router) {
        
    }   

    private createMonthYear(index: number): MonthYear {
        let today: Date = new Date();
        let currentMonth: number = today.getMonth();
        let currentYear: number = today.getFullYear();
        let newMonth: number = currentMonth + index;
        let newYear: number = currentYear;

        if (newMonth < 0) {
            let monthsToSubtract: number = (newMonth % 12);
            newMonth = 11 - monthsToSubtract;
            newYear = currentYear + Math.round(index / 12);
        } else if (newMonth > 11) {
            let monthsToAdd: number = (newMonth % 12);
            newMonth = 0 + monthsToAdd;
            newYear = currentYear + Math.round(index / 12);
        }
                
        return new MonthYear({ month: newMonth, year: newYear });
    }

    ngOnInit() {

        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                let my = this.createMonthYear(Number.parseInt(params["index"]));
                return this.apiService.getParticipationActivities(my.month, my.year);
            })
            .subscribe((participations: ParticipationActivity[]) => this.participations = participations);

        this.selectedUser = new User();
        this.currentUser = new User();

    }
    
    
}