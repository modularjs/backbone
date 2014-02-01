/**
 *
 */
define([], function () {
    "use strict";

    //use the faster Date.now if available.
    return (Date.now || function() {
        return new Date().getTime();
    });

});