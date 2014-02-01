/**
 *
 */
define(['underscore/objects/isArray', 'underscore/objects/isEmpty', 'underscore/collections/each'],
    function (isArray, isEmpty, each) {
    "use strict";


    // Return the maximum element or (element-based computation).
    // Can't optimize arrays of integers longer than 65,535 elements.
    // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
    return function(obj, iterator, context) {
        if (!iterator && isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.max.apply(Math, obj);
        }
        if (!iterator && isEmpty(obj)) {
            return -Infinity;
        }
        var result = {computed : -Infinity, value: -Infinity};
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed > result.computed && (result = {value : value, computed : computed});
        });
        return result.value;
    };
});