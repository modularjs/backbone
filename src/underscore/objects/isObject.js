/**
 * Returns true if value is an Object.
 */
define([], function () {
    "use strict";

    return function (obj) {
        return obj === Object(obj);
    };
});