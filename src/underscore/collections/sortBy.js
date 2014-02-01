/**
 *
 */
define([
    'underscore/utility/identity',
    'underscore/internal/lookupIterator',
    'underscore/collections/map',
    'underscore/collections/pluck'
], function (identity, lookupIterator, map, pluck) {
    "use strict";

    // Sort the object's values by a criterion produced by an iterator.
    return function(obj, value, context) {
        var iterator = value == null ? identity : lookupIterator(value);
        return pluck(map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
                var a = left.criteria;
                var b = right.criteria;
                if (a !== b) {
                    if (a > b || a === void 0) {
                        return 1;
                    }
                    if (a < b || b === void 0) {
                        return -1;
                    }
                }
                return left.index - right.index;
            }), 'value');
    };
});