define([
    'underscore/arrays/uniq',
    'underscore/arrays/flatten'
], function (uniq, flatten) {
    "use strict";

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    return function() {
        return uniq(flatten(arguments, true));
    };
});