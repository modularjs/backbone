/**
 * Returns true if object is a Function.
 */
define(['es5/Object/toString'], function (toString) {
    "use strict";

    return function (obj) {
        return toString.call(obj) == '[object Function]';
    };
});