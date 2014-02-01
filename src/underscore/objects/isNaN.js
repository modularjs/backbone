define([
    'underscore/objects/isNumber'
], function (isNumber) {
    "use strict";

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    return function(obj) {
        return isNumber(obj) && obj != +obj;
    };
});