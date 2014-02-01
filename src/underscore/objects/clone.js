/**
 * Create a (shallow-cloned) duplicate of an object.
 */
define([
    'underscore/objects/isObject',
    'underscore/objects/isArray',
    'underscore/objects/extend'
], function (isObject, isArray, extend) {
    "use strict";

    return function (obj) {
        if (!isObject(obj)) return obj;
        return isArray(obj) ? obj.slice() : extend({}, obj);
    };
});