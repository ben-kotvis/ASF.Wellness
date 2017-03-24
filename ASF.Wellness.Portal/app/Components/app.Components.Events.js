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
var EventsComponent = (function () {
    function EventsComponent(apiService) {
        this.apiService = apiService;
    }
    EventsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.total = 0;
        this.apiService.getEvents().subscribe(function (items) { return _this.events = items; });
        this.apiService.getParticipationEvents(1, 2017).subscribe(function (items) {
            _this.participations = items;
            _this.participations.forEach(function (s) { return _this.total += s.points; });
        });
    };
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'app-events',
            templateUrl: './app/Components/app.Components.Events.html'
        }), 
        __metadata('design:paramtypes', [app_Interfaces_Api_1.ApiServiceable])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=app.Components.Events.js.map