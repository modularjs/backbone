/**
 * Return a copy of the object only containing the whitelisted properties.
 */
define(['es5/Array/slice', 'es5/Array/concat', 'underscore/collections/each'], function (slice, concat, each) {
    "use strict";

    return function (obj) {
        var copy = {};
        var keys = concat.apply(Array.prototype, slice.call(arguments, 1));
        each(keys, function(key) {
            if (key in obj) {
                copy[key] = obj[key];
            }
        });
        return copy;
    };

});