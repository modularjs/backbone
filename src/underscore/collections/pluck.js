/**
 *
 */
define(['underscore/collections/map'], function (map) {
    "use strict";

    // Convenience version of a common use case of `map`: fetching a property.
    return function(obj, key) {
        return map(obj, function(value){ return value[key]; });
    };

});