define([
    'underscore/collections/max',
    'underscore/collections/pluck'
], function (max, pluck) {
    "use strict";

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    return function() {
        var length = max(pluck(arguments, "length").concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = pluck(arguments, '' + i);
        }
        return results;
    };

});