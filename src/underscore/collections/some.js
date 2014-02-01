/**
 * Returns true if any of the values in the list pass the iterator truth test. Short-circuits and stops traversing
 * the list if a true element is found. Delegates to the native method some, if present.
 */
define([
    'underscore/utility/identity',
    'es5/Array/some',
    'underscore/collections/each',
    'underscore/collections/loopBreaker'
], function (identity, nativeSome, each, loopBreaker) {
    "use strict";

    return function (obj, iterator, context) {
        iterator || (iterator = identity);
        var result = false;
        if (obj == null) {
            return result;
        }
        if (nativeSome && obj.some === nativeSome) {
            return obj.some(iterator, context);
        }
        each(obj, function (value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) {
                return loopBreaker;
            }
        });
        return !!result;
    };

});