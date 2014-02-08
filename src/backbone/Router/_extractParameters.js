define([
    'underscore/collections/map'
], function (map) {
    "use strict";

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    return function(route, fragment) {
        var params = route.exec(fragment).slice(1);
        return map(params, function(param, i) {
            // Don't decode the search params.
            if (i === params.length - 1) {
                return param || null;
            }
            return param ? decodeURIComponent(param) : null;
        });
    }
});