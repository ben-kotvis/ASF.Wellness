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
var app_Services_Months_1 = require("../Services/app.Services.Months");
var app_Model_User_1 = require("../Model/app.Model.User");
var MonthWellnessComponent = (function () {
    function MonthWellnessComponent(monthsService) {
        this.monthsService = monthsService;
    }
    MonthWellnessComponent.prototype.ngOnInit = function () {
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
    __metadata("design:paramtypes", [app_Services_Months_1.MonthsService])
], MonthWellnessComponent);
exports.MonthWellnessComponent = MonthWellnessComponent;
//# sourceMappingURL=app.Components.MonthWellness.js.map