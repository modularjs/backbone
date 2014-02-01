define(['backbone/util/inherits'], function (inherits) {
    "use strict";


    // The self-propagating extend function that Backbone classes use.
    return function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };
});