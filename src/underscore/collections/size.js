/**
 *
 */
define(['underscore/objects/keys'], function (keys) {
    "use strict";

    // Return the number of elements in an object.
    return function(obj) {
        if (obj == null) {
            return 0;
        }
        return (obj.length === +obj.length) ? obj.length : keys(obj).length;
    };

});