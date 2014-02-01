/**
 *
 */
define(['underscore/objects/values', 'underscore/utility/random', 'underscore/collections/shuffle'], function (values, random, shuffle) {
    "use strict";

    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    return function(obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length) {
                obj = values(obj);
            }
            return obj[random(obj.length - 1)];
        }
        return shuffle(obj).slice(0, Math.max(0, n));
    };
});