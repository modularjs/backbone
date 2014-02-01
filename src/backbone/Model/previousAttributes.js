/**
 *
 */
define(['underscore/objects/clone'], function (clone) {
    "use strict";

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    return function () {
        return clone(this._previousAttributes);
    }
});