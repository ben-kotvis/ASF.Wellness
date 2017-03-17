import {enableProdMode} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic'
import { ApiService } from '../app/Services/app.Services.Api';
import { FakeApiService } from '../app/Services/app.Services.FakeApi';
import { ApiServiceable } from '../app/Interfaces/app.Interfaces.Api';
import {HTTP_PROVIDERS} from '@angular/http';
import { ActivitiesComponent } from './Components/app.Components.Activities';

bootstrap(ActivitiesComponent, [HTTP_PROVIDERS, { provide: ApiServiceable, useClass: FakeApiService }]); 