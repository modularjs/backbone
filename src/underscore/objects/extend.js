/**
 * Extend a given object with all the properties in passed-in object(s).
 */
define(['es5/Array/slice', 'underscore/collections/each'], function (slice, each) {
    "use strict";

    return function (obj) {
        each(slice.call(arguments, 1), function (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    };
});