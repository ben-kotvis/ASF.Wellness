"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = (function () {
    function Constants() {
    }
    Constants.activitiesPath = function () {
        return Constants.BASE_URL.concat(Constants.ACTIVITIES_PATH);
    };
    return Constants;
}());
Constants.BASE_URL = "http://localhost:8512";
Constants.ACTIVITIES_PATH = "/api/activities";
exports.Constants = Constants;
//# sourceMappingURL=app.Common.Constants.js.map