"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
//import { enableProdMode } from '@angular/core';
//import { bootstrap } from '@angular/platform-browser-dynamic'
//import { ApiService } from '../app/Services/app.Services.Api';
//import { FakeApiService } from '../app/Services/app.Services.FakeApi';
//import { MonthsService } from '../app/Services/app.Services.Months';
//import { ApiServiceable } from '../app/Interfaces/app.Interfaces.Api';
//import { HTTP_PROVIDERS } from '@angular/http';
//import { MainComponent } from './Components/app.Components.Main';
//
//
//bootstrap(MainComponent, [HTTP_PROVIDERS, { provide: ApiServiceable, useClass: FakeApiService }, MonthsService]); 
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map