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
var app_Model_Month_1 = require('../Model/app.Model.Month');
var UsersComponent = (function () {
    function UsersComponent() {
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.monthOffset = 0;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    };
    UsersComponent.prototype.previous = function () {
        this.monthOffset = this.monthInfo[2].offset - 5;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    };
    UsersComponent.prototype.next = function () {
        this.monthOffset = this.monthInfo[2].offset + 5;
        this.monthInfo = this.getMonthInformation(this.monthOffset);
    };
    UsersComponent.prototype.setOffset = function (offset) {
        for (var _i = 0, _a = this.monthInfo; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.offset == offset) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
        }
    };
    UsersComponent.prototype.getMonthInformation = function (offset) {
        var date = new Date();
        date.setDate(1);
        var currentMonthIndex = date.getMonth() + offset;
        var firstDate = new Date();
        firstDate.setDate(1);
        var firstOffset = currentMonthIndex - 2;
        firstDate.setMonth(firstOffset);
        var secondDate = new Date();
        secondDate.setDate(1);
        var secondOffset = currentMonthIndex - 1;
        secondDate.setMonth(secondOffset);
        var thirdDate = new Date();
        thirdDate.setDate(1);
        thirdDate.setMonth(currentMonthIndex);
        var fourthDate = new Date();
        fourthDate.setDate(1);
        var fourthOffset = currentMonthIndex + 1;
        fourthDate.setMonth(fourthOffset);
        var fifthDate = new Date();
        fifthDate.setDate(1);
        var fifthOffset = currentMonthIndex + 2;
        fifthDate.setMonth(fifthOffset);
        var monthInfo = [
            new app_Model_Month_1.Month({ month: this.getMonthName(firstDate.getMonth()), year: firstDate.getFullYear(), offset: offset - 2, selected: false }),
            new app_Model_Month_1.Month({ month: this.getMonthName(secondDate.getMonth()), year: secondDate.getFullYear(), offset: offset - 1, selected: false }),
            new app_Model_Month_1.Month({ month: this.getMonthName(thirdDate.getMonth()), year: thirdDate.getFullYear(), offset: offset, selected: true }),
            new app_Model_Month_1.Month({ month: this.getMonthName(fourthDate.getMonth()), year: fourthDate.getFullYear(), offset: offset + 1, selected: false }),
            new app_Model_Month_1.Month({ month: this.getMonthName(fifthDate.getMonth()), year: fifthDate.getFullYear(), offset: offset + 2, selected: false })
        ];
        return monthInfo;
    };
    UsersComponent.prototype.getMonthName = function (monthNumber) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return month[monthNumber];
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './app/Components/app.Components.MonthMenu.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=app.Components.Users.js.map