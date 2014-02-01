/**
 * Convert an object into a list of `[key, value]` pairs.
 */
define(['underscore/objects/keys'], function (underscoreKeys) {
    "use strict";

    return function (obj) {
        var result = {};
        var keys = underscoreKeys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

});