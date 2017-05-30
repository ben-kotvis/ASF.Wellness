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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_Interfaces_Api_1 = require("../Interfaces/app.Interfaces.Api");
var app_Model_MonthYear_1 = require("../Model/app.Model.MonthYear");
var app_Services_Months_1 = require("../Services/app.Services.Months");
var app_Model_User_1 = require("../Model/app.Model.User");
var router_1 = require("@angular/router");
var MonthWellnessComponent = (function () {
    function MonthWellnessComponent(apiService, monthsService, route, router) {
        this.apiService = apiService;
        this.monthsService = monthsService;
        this.route = route;
        this.router = router;
    }
    MonthWellnessComponent.prototype.createMonthYear = function (index) {
        var today = new Date();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();
        var newMonth = currentMonth + index;
        var newYear = currentYear;
        if (newMonth < 0) {
            var monthsToSubtract = (newMonth % 12);
            newMonth = 11 - monthsToSubtract;
            newYear = currentYear + Math.round(index / 12);
        }
        else if (newMonth > 11) {
            var monthsToAdd = (newMonth % 12);
            newMonth = 0 + monthsToAdd;
            newYear = currentYear + Math.round(index / 12);
        }
        return new app_Model_MonthYear_1.MonthYear({ month: newMonth, year: newYear });
    };
    MonthWellnessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            var my = _this.createMonthYear(Number.parseInt(params["index"]));
            return _this.apiService.getParticipationActivities(my.month, my.year);
        })
            .subscribe(function (participations) { return _this.participations = participations; });
        this.selectedUser = new app_Model_User_1.User();
        this.currentUser = new app_Model_User_1.User();
    };
    return MonthWellnessComponent;
}());
MonthWellnessComponent = __decorate([
    core_1.Component({
        selector: 'month-wellness',
        templateUrl: './app/Components/app.Components.MonthWellness.html'
    }),
    __metadata("design:paramtypes", [app_Interfaces_Api_1.ApiServiceable,
        app_Services_Months_1.MonthsService,
        router_1.ActivatedRoute,
        router_1.Router])
], MonthWellnessComponent);
exports.MonthWellnessComponent = MonthWellnessComponent;
//# sourceMappingURL=app.Components.MonthWellness.js.map