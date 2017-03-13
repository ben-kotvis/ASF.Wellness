"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_Services_Api_1 = require('../app/Services/app.Services.Api');
var http_1 = require('@angular/http');
var app_Components_Activities_1 = require('./Components/app.Components.Activities');
platform_browser_dynamic_1.bootstrap(app_Components_Activities_1.ActivitiesComponent, [http_1.HTTP_PROVIDERS, app_Services_Api_1.ApiService]);
//# sourceMappingURL=app.Module.js.map