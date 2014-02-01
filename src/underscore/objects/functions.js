define([
    'underscore/objects/isFunction'
], function (isFunction) {
    "use strict";

    // Return a sorted list of the function names available on the object.
    return function(obj) {
        var names = [];
        for (var key in obj) {
            if (isFunction(obj[key])) {
                names.push(key);
            }
        }
        return names.sort();
    };
});