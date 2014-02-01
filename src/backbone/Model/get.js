define([], function () {
    "use strict";

    return function (attr) {
        return this.attributes[attr];
    };
});