import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppComponent }  from './app.component';
import { MainComponent } from './Components/app.Components.Main';
import { ActivitiesComponent } from './Components/app.Components.Activities';
import { EventsComponent } from './Components/app.Components.Events';
import { MonthMenuComponent } from './Components/app.Components.MonthMenu';
import { UsersComponent } from './Components/app.Components.Users';
import { ActivityManagementComponent } from './Components/app.Components.ActivityManagement'; 
import { MonthWellnessComponent } from './Components/app.Components.MonthWellness'; 
import { RouterModule, Routes } from '@angular/router';


import { ApiService } from '../app/Services/app.Services.Api';
import { FakeApiService } from '../app/Services/app.Services.FakeApi';
import { MonthsService } from '../app/Services/app.Services.Months';
import { ApiServiceable } from '../app/Interfaces/app.Interfaces.Api';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
    { path: '', redirectTo: 'monthWellness/0', pathMatch: 'full' },
    { path: 'monthWellness/:index', component: MonthWellnessComponent },
    { path: 'activities', component: ActivityManagementComponent },
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes) ],
    declarations: [MainComponent, ActivitiesComponent, EventsComponent, MonthMenuComponent, UsersComponent, ActivityManagementComponent, MonthWellnessComponent ],
  bootstrap: [MainComponent],
  providers: [{ provide: ApiServiceable, useClass: FakeApiService }, MonthsService]
})
export class AppModule { }

