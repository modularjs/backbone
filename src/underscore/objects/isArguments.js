/**
 * Returns true if object is Arguments.
 */
define(['es5/Object/toString', 'underscore/objects/has'], function (toString, has) {
    "use strict";

    var isArguments = function (obj) {
        return toString.call(obj) == '[object Arguments]';
    };

    // Define a fallback version of the method in browsers (ahem, IE), where
    // there isn't any inspectable "Arguments" type.
    if (!isArguments(arguments)) {
        isArguments = function(obj) {
            return !!(obj && has(obj, 'callee'));
        };
    }

    return isArguments;
});