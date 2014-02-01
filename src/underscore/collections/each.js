/**
 * The cornerstone, an `each` implementation, aka `forEach`.
 * Handles objects with the built-in `forEach`, arrays, and raw objects.
 * Delegates to **ECMAScript 5**'s native `forEach` if available.
 */
define([
    'es5/Array/forEach',
    'underscore/collections/loopBreaker',
    'underscore/objects/has'
], function (nativeForEach, breaker, has) {
    "use strict";

    return function (obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
});