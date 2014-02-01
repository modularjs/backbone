/**
 * Does the object contain the given key? Identical to object.hasOwnProperty(key),
 * but uses a safe reference to the hasOwnProperty function, in case it's been overridden accidentally.
 */
define(['es5/Object/hasOwnProperty'], function (hasOwnProperty) {
    "use strict";

    return function (obj, key) {
        return hasOwnProperty.call(obj, key);
    };
});