define([

], function () {
    "use strict";

    return function(value) {
        return function () {
            return value;
        };
    };
});