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
var app_Interfaces_Api_1 = require('../Interfaces/app.Interfaces.Api');
var ActivitiesComponent = (function () {
    function ActivitiesComponent(apiService) {
        this.apiService = apiService;
        this.todoEdit = null;
        this.title = "Hello world";
    }
    ActivitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getActivities().subscribe(function (items) { return _this.activities = items; });
        this.apiService.getParticipationActivities().subscribe(function (items) { return _this.participations = items; });
    };
    ActivitiesComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './app/Components/app.Components.Activities.html'
        }), 
        __metadata('design:paramtypes', [app_Interfaces_Api_1.ApiServiceable])
    ], ActivitiesComponent);
    return ActivitiesComponent;
}());
exports.ActivitiesComponent = ActivitiesComponent;
//# sourceMappingURL=app.Components.Activities.js.map