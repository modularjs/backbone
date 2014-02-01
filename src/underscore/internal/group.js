/**
 *
 */
define(['underscore/utility/identity', 'underscore/internal/lookupIterator', 'underscore/collections/each'],
    function (identity, lookupIterator, each) {
    "use strict";

    // An internal function used for aggregate "group by" operations.
    return function(behavior) {
        return function(obj, value, context) {
            var result = {};
            var iterator = value == null ? identity : lookupIterator(value);
            each(obj, function(value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value);
            });
            return result;
        };
    };
});