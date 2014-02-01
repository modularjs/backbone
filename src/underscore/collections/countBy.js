/**
 *
 */
define(['underscore/internal/group', 'underscore/objects/has'], function (group, has) {
    "use strict";

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    return group(function(result, key, value) {
        has(result, key) ? result[key]++ : result[key] = 1;
    });

});