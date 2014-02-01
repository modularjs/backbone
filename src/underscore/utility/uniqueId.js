/**
 * Generate a globally-unique id for client-side models or DOM elements that need one.
 * If prefix is passed, the id will be appended to it. Without prefix, returns an integer.
 */
define([], function () {
    "use strict";

    var idCounter = 0;

    return function (prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };
});