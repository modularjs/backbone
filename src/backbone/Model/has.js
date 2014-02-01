define([], function () {
    "use strict";

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    return function (attr) {
        return this.get(attr) != null;
    };
});