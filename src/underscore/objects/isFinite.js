define([

], function () {
    "use strict";

    // Is a given object a finite number?
    return function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
});