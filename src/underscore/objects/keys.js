/**
 * Retrieve all the names of the object's properties.
 */
define(['es5/Object/keys', 'underscore/objects/has', 'underscore/objects/isObject'], function (nativeKeys, has, isObject) {
    "use strict";

    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    return function(obj) {
        if (!isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (has(obj, key)) keys.push(key);
        return keys;
    };

});