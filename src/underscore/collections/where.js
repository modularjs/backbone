define([
    'underscore/collections/find',
    'underscore/collections/filter'
], function (find, filter) {
    "use strict";

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    return function(obj, attrs, first) {
        var method = first ? find : filter;
        return method(obj, function(value) {
            for (var key in attrs) {
                if (attrs[key] !== value[key]) return false;
            }
            return true;
        });
    };
});