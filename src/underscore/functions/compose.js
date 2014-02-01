define([

], function () {
    "use strict";

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    return function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };

});