define([
    'underscore/objects/isArray',
    'underscore/objects/values',
    'underscore/collections/map',
    'underscore/utility/identity',
    'es5/Array/slice'
], function (isArray, values, map, identity, slice) {
    "use strict";

    // Safely create a real, live array from anything iterable.
    return function(obj) {
        if (!obj) return [];
        if (isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return map(obj, identity);
        return values(obj);
    };

});