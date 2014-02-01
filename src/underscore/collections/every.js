define([
    'es5/Array/every',
    'underscore/collections/each',
    'underscore/collections/loopBreaker',
    'underscore/utility/identity'
], function (nativeEvery, each, breaker, identity) {
    "use strict";

    // Determine whether all of the elements match a truth test.
    // Delegates to **ECMAScript 5**'s native `every` if available.
    // Aliased as `all`.
    return function(obj, iterator, context) {
        iterator || (iterator = identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
});