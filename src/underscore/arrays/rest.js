/**
 *
 */
define(['es5/Array/slice'], function (slice) {
    "use strict";

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array. The **guard**
    // check allows it to work with `_.map`.
    return function(array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };
});