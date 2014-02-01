/**
 *
 */
define([], function () {
    "use strict";

    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    return function(func) {
        var ran = false, memo;
        return function() {
            if (ran) {
                return memo;
            }
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
});