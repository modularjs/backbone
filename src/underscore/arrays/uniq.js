define([
    'underscore/objects/isFunction',
    'underscore/collections/map',
    'underscore/collections/each',
    'underscore/collections/contains'
], function (isFunction, map, each, contains) {
    "use strict";

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    return function(array, isSorted, iterator, context) {
        if (isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? (!index || seen[seen.length - 1] !== value) : !contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
});