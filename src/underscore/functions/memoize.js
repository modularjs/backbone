define([
    'underscore/utility/identity',
    'underscore/objects/has'
], function (identity, has) {
    "use strict";

    // Memoize an expensive function by storing its results.
    return function(func, hasher) {
        var memo = {};
        hasher || (hasher = identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
});