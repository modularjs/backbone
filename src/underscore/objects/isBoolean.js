define([
    'es5/Object/toString'
], function (toString) {
    "use strict";

    // Is a given value a boolean?
    return function(obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };

});