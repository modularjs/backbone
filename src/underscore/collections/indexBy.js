/**
 *
 */
define(['underscore/internal/group'], function (group) {
    "use strict";

    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    return group(function(result, key, value) {
        result[key] = value;
    });

});