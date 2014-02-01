/**
 *
 */
define(['es5/Array/map', 'underscore/collections/each'], function (nativeMap, each) {
    "use strict";

    // Return the results of applying the iterator to each element.
    // Delegates to **ECMAScript 5**'s native `map` if available.
    return function(obj, iterator, context) {
        var results = [];
        if (obj == null) {
            return results;
        }
        if (nativeMap && obj.map === nativeMap) {
            return obj.map(iterator, context);
        }
        each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
});