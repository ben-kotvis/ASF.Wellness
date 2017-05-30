import { Component, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { MonthsService } from '../Services/app.Services.Months';
import { Activity } from '../Model/app.Model.Activity';
import { ParticipationActivity } from '../Model/app.Model.ParticipationActivity';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-activities',
    templateUrl: './app/Components/app.Components.Activities.html'
})
export class ActivitiesComponent {
            
    activities: Activity[];
    
    total: number;

    @Input() participations: ParticipationActivity[];
    
    constructor(private apiService: ApiServiceable, private monthsService: MonthsService) {
          
    }   
   
    
    ngOnInit() {
        this.total = 0;

        this.apiService.getActivities().subscribe(items => this.activities = items);

        let today = new Date();

        //this.apiService.getParticipationActivities(today.getMonth(), today.getFullYear()).subscribe(items => {
        //    this.participations = items;
        //    this.participations.forEach(s => this.total += s.points);
        //});

        //this.monthsService.monthChanged$.subscribe(
        //    monthYear => {
        //        this.apiService.getParticipationActivities(monthYear.month, monthYear.year).subscribe(items => {
        //            this.participations = items;
        //            this.participations.forEach(s => this.total += s.points);
        //        });
        //    });
        
    }

    participationsReceived(items: ParticipationActivity[]): void {
        //console.log(items.length);
        //this.participations = items;
        //this.participations.forEach(s => this.total += s.points);
    }


}