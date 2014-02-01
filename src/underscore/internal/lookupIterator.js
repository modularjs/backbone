/**
 *
 */
define(['underscore/objects/isFunction'], function (isFunction) {
    "use strict";

    return function(value) {
        return isFunction(value) ? value : function(obj){ return obj[value]; };
    };
});