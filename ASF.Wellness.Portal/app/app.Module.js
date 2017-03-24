"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_Services_FakeApi_1 = require('../app/Services/app.Services.FakeApi');
var app_Services_Months_1 = require('../app/Services/app.Services.Months');
var app_Interfaces_Api_1 = require('../app/Interfaces/app.Interfaces.Api');
var http_1 = require('@angular/http');
var app_Components_Main_1 = require('./Components/app.Components.Main');
platform_browser_dynamic_1.bootstrap(app_Components_Main_1.MainComponent, [http_1.HTTP_PROVIDERS, { provide: app_Interfaces_Api_1.ApiServiceable, useClass: app_Services_FakeApi_1.FakeApiService }, app_Services_Months_1.MonthsService]);
//# sourceMappingURL=app.Module.js.map