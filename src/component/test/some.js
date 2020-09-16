"use strict";
exports.__esModule = true;
var getToken = function () {
    console.log("getToken");
    return "token";
};
exports.token = getToken();
var count = 0;
exports.func = function () {
    console.log("TOKEN " + count + " === " + exports.token);
    count++;
};
