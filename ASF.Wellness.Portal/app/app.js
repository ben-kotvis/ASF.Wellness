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
var angular2_1 = require("angular2/angular2");
var app_Services_Api_1 = require("../app/Services/app.Services.Api");
var http_1 = require("angular2/http");
var TodoApp = (function () {
    function TodoApp(http, apiService) {
        var _this = this;
        this.http = http;
        this.apiService = apiService;
        this.something = { prop1: "Hello" };
        this.todoEdit = null;
        this.title = "Hello world";
        this.apiService.getActivities().then(function (response) { return _this.activities = response; });
    }
    return TodoApp;
}());
__decorate([
    angular2_1.Input(),
    __metadata("design:type", Object)
], TodoApp.prototype, "something", void 0);
TodoApp = __decorate([
    angular2_1.Component({
        selector: 'home',
        directives: [angular2_1.NgFor],
        templateUrl: 'home.html',
        providers: [app_Services_Api_1.ApiService]
    }),
    __metadata("design:paramtypes", [http_1.Http, app_Services_Api_1.ApiService])
], TodoApp);
angular2_1.bootstrap(TodoApp);
