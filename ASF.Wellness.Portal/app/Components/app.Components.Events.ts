import {Component, Input, Inject} from '@angular/core';
//import { ApiService, ApiServiceable } from '../Services/app.Services.Api';

import { ApiServiceable } from '../Interfaces/app.Interfaces.Api';
import { Event } from '../Model/app.Model.Event';
import { ParticipationEvent } from '../Model/app.Model.ParticipationEvent';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-events',
    templateUrl: './app/Components/app.Components.Events.html'
})
export class EventsComponent {
        
    todoEdit: any;
    title: string;
    events: Event[];
    participations: ParticipationEvent[];

    constructor(private apiService: ApiServiceable) {
        
        this.todoEdit = null;
        this.title = "Hello world";        
    }   

    ngOnInit() {
        this.apiService.getEvents().subscribe(items => this.events = items);
        this.apiService.getParticipationEvents().subscribe(items => this.participations = items);
    }


}