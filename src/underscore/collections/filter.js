/**
 *
 */
define(['es5/Array/filter', 'underscore/collections/each'], function (nativeFilter, each) {
    "use strict";


    // Return all the elements that pass a truth test.
    // Delegates to **ECMAScript 5**'s native `filter` if available.
    // Aliased as `select`.
    return function(obj, iterator, context) {
        var results = [];
        if (obj == null) {
            return results;
        }
        if (nativeFilter && obj.filter === nativeFilter) {
            return obj.filter(iterator, context);
        }
        each(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                results.push(value);
            }
        });
        return results;
    };

});