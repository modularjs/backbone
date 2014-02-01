/**
 *
 */
define(['es5/Array/slice'], function (slice) {
    "use strict";

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    return function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function(){ return func.apply(null, args); }, wait);
    };

});