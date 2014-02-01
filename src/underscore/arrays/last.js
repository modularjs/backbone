/**
 *
 */
define(['es5/Array/slice'], function (slice) {
    "use strict";

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array. The **guard** check allows it to work with `_.map`.
    return function(array, n, guard) {
        if (array == null) {
            return void 0;
        }
        if ((n == null) || guard) {
            return array[array.length - 1];
        } else {
            return slice.call(array, Math.max(array.length - n, 0));
        }
    };
});