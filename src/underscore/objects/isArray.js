/**
 * Returns true if value is an Array.
 */
define(['es5/Array/isArray', 'es5/Object/toString'], function (nativeIsArray, toString) {
    "use strict";

    return nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    };
});