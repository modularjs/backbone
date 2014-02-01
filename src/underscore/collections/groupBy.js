/**
 *
 */
define(['underscore/internal/group', 'underscore/objects/has'], function (group, has) {
    "use strict";

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    return group(function(result, key, value) {
        (has(result, key) ? result[key] : (result[key] = [])).push(value);
    });

});