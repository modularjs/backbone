/**
 *
 */
define(['underscore/arrays/difference', 'es5/Array/slice'], function (difference, slice) {
    "use strict";

    // Return a version of the array that does not contain the specified value(s).
    return function(array) {
        return difference(array, slice.call(arguments, 1));
    };

});