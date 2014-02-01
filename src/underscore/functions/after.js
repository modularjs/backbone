define([

], function () {
    "use strict";

    // Returns a function that will only be executed after being called N times.
    return function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

});