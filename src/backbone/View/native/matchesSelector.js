define([
    'underscore/collections/each'
], function (each) {
    "use strict";

    var matchesSelector = Element.prototype.matchesSelector || null;

    if (!matchesSelector){
        each(['webkit', 'moz', 'o', 'ms'], function(prefix){
            var func = Element.prototype[prefix + 'MatchesSelector'];
            if (func) {
                matchesSelector = func;
            }
        });
    }

    return matchesSelector;
});