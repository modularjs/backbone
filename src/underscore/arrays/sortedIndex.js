/**
 *
 */
define([
    'underscore/utility/identity',
    'underscore/internal/lookupIterator'
], function (identity, lookupIterator) {
    "use strict";

    return function(array, obj, iterator, context) {
        iterator = iterator == null ? identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
});