"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_Services_FakeApi_1 = require('../app/Services/app.Services.FakeApi');
var app_Interfaces_Api_1 = require('../app/Interfaces/app.Interfaces.Api');
var http_1 = require('@angular/http');
var app_Components_Activities_1 = require('./Components/app.Components.Activities');
platform_browser_dynamic_1.bootstrap(app_Components_Activities_1.ActivitiesComponent, [http_1.HTTP_PROVIDERS, { provide: app_Interfaces_Api_1.ApiServiceable, useClass: app_Services_FakeApi_1.FakeApiService }]);
//# sourceMappingURL=app.Module.js.map