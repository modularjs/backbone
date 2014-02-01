define([
    'underscore/collections/filter'
], function (filter) {
    "use strict";

    // Return all the elements for which a truth test fails.
    return function(obj, iterator, context) {
        return filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list);
        }, context);
    };

});