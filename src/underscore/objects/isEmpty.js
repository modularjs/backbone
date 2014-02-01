define([
    'underscore/objects/isArray',
    'underscore/objects/isString',
    'underscore/objects/has'
], function (isArray, isString, has) {
    "use strict";

    return function (obj) {
        if (obj == null) return true;
        if (isArray(obj) || isString(obj)) return obj.length === 0;
        for (var key in obj) if (has(obj, key)) return false;
        return true;
    };
});