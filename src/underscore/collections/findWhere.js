define([
    'underscore/collections/where'
], function (where) {
    "use strict";

    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    return function(obj, attrs) {
        return where(obj, attrs, true);
    };

});