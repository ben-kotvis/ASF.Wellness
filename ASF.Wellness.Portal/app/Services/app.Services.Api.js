"use strict";
var ApiService = (function () {
    function ApiService() {
    }
    ApiService.prototype.getActivities = function () {
        var activities = new Array();
        activities.push({ name: "One", id: "" });
        activities.push({ name: "Two", id: "" });
        return activities;
    };
    return ApiService;
}());
exports.ApiService = ApiService;
