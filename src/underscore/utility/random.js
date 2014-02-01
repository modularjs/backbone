/**
 *
 */
define([], function () {
    "use strict";


    // Return a random integer between min and max (inclusive).
    return function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
});