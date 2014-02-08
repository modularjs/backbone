define([

], function () {
    "use strict";

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    return function(window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
    };
});