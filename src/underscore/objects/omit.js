/**
 * Return a copy of the object without the blacklisted properties.
 */
define([
    'es5/Array/slice',
    'es5/Array/concat',
    'underscore/collections/contains'
], function (slice, concat, contains) {
    "use strict";

    return function (obj) {
        var copy = {};
        var keys = concat.apply(Array.prototype, slice.call(arguments, 1));
        for (var key in obj) {
            if (!contains(keys, key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    };

});