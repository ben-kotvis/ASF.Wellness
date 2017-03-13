"use strict";
var Constants = (function () {
    function Constants() {
    }
    Constants.activitiesPath = function () {
        return Constants.BASE_URL.concat(Constants.ACTIVITIES_PATH);
    };
    Constants.BASE_URL = "http://localhost:8512";
    Constants.ACTIVITIES_PATH = "/api/activities";
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=app.Common.Constants.js.map