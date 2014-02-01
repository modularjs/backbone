/**
 *
 */
define(['underscore/functions/delay', 'es5/Array/slice'], function (delay, slice) {
    "use strict";

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    return function(func) {
        return delay.apply(null, [func, 1].concat(slice.call(arguments, 1)));
    };

});