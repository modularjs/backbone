/**
 *
 */
define(['underscore/collections/some'], function (some) {
    "use strict";

    // Return the first value which passes a truth test. Aliased as `detect`.
    return function (obj, iterator, context) {
        var result;
        some(obj, function (value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
});