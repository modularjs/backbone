define([

], function () {
    "use strict";

    return function(key) {
        return function(obj) {
            return obj[key];
        };
    };
});