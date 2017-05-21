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
var app_Model_Activity_1 = require("../Model/app.Model.Activity");
var ActivityManagementComponent = (function () {
    function ActivityManagementComponent(apiService) {
        this.apiService = apiService;
    }
    ActivityManagementComponent.prototype.addActivity = function () {
        var created = new app_Model_Activity_1.Activity();
        created.name = this.newActivityName;
        created.active = this.newActive;
        created.dirty = false;
        created.updatedBy = "bkotvis";
        created.updatedOn = new Date();
        this.apiService.createActivity(created);
    };
    ActivityManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.newActive = true;
        this.apiService.getActivities().subscribe(function (items) { return _this.activities = items; });
        this.editingActivity = new app_Model_Activity_1.Activity();
    };
    ActivityManagementComponent.prototype.edit = function (activity) {
        this.setEditing();
        this.original = JSON.stringify(activity);
        activity.dirty = true;
        this.editingActivity = activity;
    };
    ActivityManagementComponent.prototype.delete = function (activity) {
        this.apiService.deleteActivity(activity.id);
    };
    ActivityManagementComponent.prototype.saveExisting = function (activity) {
        this.apiService.updateActivity(activity);
        activity.dirty = false;
    };
    ActivityManagementComponent.prototype.cancelExisting = function (activity) {
        //console.log(activity);
        var originalItem = JSON.parse(this.original);
        activity.name = originalItem.name;
        activity.active = originalItem.active;
        activity.dirty = false;
        this.setEditing();
    };
    ActivityManagementComponent.prototype.setEditing = function () {
        for (var i = 0; i < this.activities.length; i++) {
            var item = this.activities[i];
            item.dirty = false;
        }
        this.editingActivity = new app_Model_Activity_1.Activity();
    };
    return ActivityManagementComponent;
}());
ActivityManagementComponent = __decorate([
    core_1.Component({
        selector: 'app-activity-management',
        templateUrl: './app/Components/app.Components.ActivityManagement.html'
    }),
    __metadata("design:paramtypes", [app_Interfaces_Api_1.ApiServiceable])
], ActivityManagementComponent);
exports.ActivityManagementComponent = ActivityManagementComponent;
//# sourceMappingURL=app.Components.ActivityManagement.js.map