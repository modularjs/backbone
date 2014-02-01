/**
 * Returns the same value that is used as the argument. In math: f(x) = x
 * This function looks useless, but is used throughout Underscore as a default iterator.
 */
define([], function () {
    "use strict";

    return function (value) {
        return value;
    };

});