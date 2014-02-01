define([

], function () {
    "use strict";

    // Is a given value a DOM element?
    return function(obj) {
        return !!(obj && obj.nodeType === 1);
    };

});