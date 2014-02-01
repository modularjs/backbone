/**
 * Determine if the array or object contains a given value (using `===`).
 */
define(['es5/Array/indexOf', 'underscore/collections/some'], function (nativeIndexOf, some) {
    "use strict";

    return function (obj, target) {
        if (obj == null) {
            return false;
        }
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
            return obj.indexOf(target) != -1;
        }
        return some(obj, function(value) {
            return value === target;
        });
    };

});