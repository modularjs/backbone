define([
    'underscore/functions/partial'
], function (partial) {
    "use strict";

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    return function(func, wrapper) {
        return partial(wrapper, func);
    };

});