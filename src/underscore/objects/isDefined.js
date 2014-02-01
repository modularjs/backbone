/**
 *
 */
define(['underscore/objects/isUndefined'], function (isUndefined) {
    "use strict";

    return function (obj) {
        return !isUndefined(obj);
    };
});