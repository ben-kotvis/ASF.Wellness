"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/RX');
var app_Common_Constants_1 = require('../Common/app.Common.Constants');
var app_Interfaces_Api_1 = require('../Interfaces/app.Interfaces.Api');
var ApiService = (function (_super) {
    __extends(ApiService, _super);
    function ApiService(http) {
        _super.call(this);
        this.http = http;
    }
    ApiService.prototype.getActivities = function () {
        var url = app_Common_Constants_1.Constants.activitiesPath();
        return this.http.get(url).map(function (r) { return r.json(); });
    };
    ApiService.prototype.getParticipationActivities = function (month, year) {
        var activities = new Array();
        activities.push({ id: "123", name: "Walking", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "124", name: "Running", numberOfMinutes: 30, approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        activities.push({ id: "125", name: "Biking", numberOfMinutes: 30, approved: false, date: new Date(), points: 21, userId: "adsf", approvalId: "" });
        return Observable_1.Observable.create(function (observer) {
            observer.next(activities);
            observer.complete();
        });
    };
    ApiService.prototype.getEvents = function () {
        var names = new Array();
        names.push({ id: "123", name: "Hello" });
        names.push({ id: "124", name: "World" });
        return Observable_1.Observable.create(function (observer) {
            observer.next(names);
            observer.complete();
        });
    };
    ApiService.prototype.getParticipationEvents = function (month, year) {
        var events = new Array();
        events.push({ id: "123", name: "Walking", fileId: "", approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "124", name: "Running", fileId: "", approved: false, date: new Date(), points: 1, userId: "adsf", approvalId: "" });
        events.push({ id: "125", name: "Biking", fileId: "", approved: false, date: new Date(), points: 21, userId: "adsf", approvalId: "" });
        return Observable_1.Observable.create(function (observer) {
            observer.next(events);
            observer.complete();
        });
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiService);
    return ApiService;
}(app_Interfaces_Api_1.ApiServiceable));
exports.ApiService = ApiService;
//# sourceMappingURL=app.Services.Api.js.map