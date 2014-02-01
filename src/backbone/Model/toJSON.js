define(['underscore/objects/clone'], function (clone) {
    "use strict";

    return function (options) {
        return clone(this.attributes);
    };
});