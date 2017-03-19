"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { ApiService, ApiServiceable } from '../Services/app.Services.Api';
var app_Model_User_1 = require('../Model/app.Model.User');
var app_Components_Activities_1 = require('../Components/app.Components.Activities');
var app_Components_Events_1 = require('../Components/app.Components.Events');
var app_Components_MonthMenu_1 = require('../Components/app.Components.MonthMenu');
var app_Components_Users_1 = require('../Components/app.Components.Users');
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
        this.loginLinkMessage = "Hello";
        this.selectedUser = new app_Model_User_1.User();
        this.currentUser = new app_Model_User_1.User();
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            templateUrl: './app/Components/app.Components.Main.html',
            directives: [app_Components_Activities_1.ActivitiesComponent, app_Components_Events_1.EventsComponent, app_Components_MonthMenu_1.MonthMenuComponent, app_Components_Users_1.UsersComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=app.Components.Main.js.map