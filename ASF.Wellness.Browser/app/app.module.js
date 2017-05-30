"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
//import { AppComponent }  from './app.component';
var app_Components_Main_1 = require("./Components/app.Components.Main");
var app_Components_Activities_1 = require("./Components/app.Components.Activities");
var app_Components_Events_1 = require("./Components/app.Components.Events");
var app_Components_MonthMenu_1 = require("./Components/app.Components.MonthMenu");
var app_Components_Users_1 = require("./Components/app.Components.Users");
var app_Components_ActivityManagement_1 = require("./Components/app.Components.ActivityManagement");
var app_Components_MonthWellness_1 = require("./Components/app.Components.MonthWellness");
var router_1 = require("@angular/router");
var app_Services_FakeApi_1 = require("../app/Services/app.Services.FakeApi");
var app_Services_Months_1 = require("../app/Services/app.Services.Months");
var app_Interfaces_Api_1 = require("../app/Interfaces/app.Interfaces.Api");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var appRoutes = [
    { path: '', redirectTo: 'monthWellness/0', pathMatch: 'full' },
    { path: 'monthWellness/:index', component: app_Components_MonthWellness_1.MonthWellnessComponent },
    { path: 'activities', component: app_Components_ActivityManagement_1.ActivityManagementComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes)],
        declarations: [app_Components_Main_1.MainComponent, app_Components_Activities_1.ActivitiesComponent, app_Components_Events_1.EventsComponent, app_Components_MonthMenu_1.MonthMenuComponent, app_Components_Users_1.UsersComponent, app_Components_ActivityManagement_1.ActivityManagementComponent, app_Components_MonthWellness_1.MonthWellnessComponent],
        bootstrap: [app_Components_Main_1.MainComponent],
        providers: [{ provide: app_Interfaces_Api_1.ApiServiceable, useClass: app_Services_FakeApi_1.FakeApiService }, app_Services_Months_1.MonthsService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map