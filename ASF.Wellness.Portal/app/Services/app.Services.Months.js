"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var MonthsService = (function () {
    function MonthsService() {
        this.monthChangedSource = new Subject_1.Subject();
        // Observable string streams
        this.monthChanged$ = this.monthChangedSource.asObservable();
    }
    // Service message commands
    MonthsService.prototype.announceMonthChanged = function (monthYear) {
        this.monthChangedSource.next(monthYear);
    };
    return MonthsService;
}());
MonthsService = __decorate([
    core_1.Injectable()
], MonthsService);
exports.MonthsService = MonthsService;
