/**
 * Retrieve the values of an object's properties.
 */
define(['underscore/objects/keys'], function (underscoreKeys) {
    "use strict";

    return function (obj) {
        var keys = underscoreKeys(obj);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

});