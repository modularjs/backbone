define([
    'underscore/collections/filter',
    'underscore/utility/identity'
], function (filter, identity) {
    "use strict";

    // Trim out all falsy values from an array.
    return function(array) {
        return filter(array, identity);
    };

});