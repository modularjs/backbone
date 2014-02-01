/**
 *
 */
define([], function () {
    "use strict";

    // Is a given variable undefined?
    return function(obj) {
        return obj === void 0;
    };
});