/**
 *
 */
define([
    'es5/Array/concat',
    'es5/Array/slice',
    'underscore/collections/filter',
    'underscore/collections/contains'
], function (concat, slice, filter, contains) {
    "use strict";


    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    return function(array) {
        var rest = concat.apply(Array.prototype, slice.call(arguments, 1));
        return filter(array, function(value){ return !contains(rest, value); });
    };
});