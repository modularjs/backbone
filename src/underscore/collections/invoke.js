/**
 *
 */
define([
    'es5/Array/slice',
    'underscore/objects/isFunction',
    'underscore/collections/map'
], function (slice, isFunction, map) {
    "use strict";

    // Invoke a method (with arguments) on every item in a collection.
    return function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = isFunction(method);
        return map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
});