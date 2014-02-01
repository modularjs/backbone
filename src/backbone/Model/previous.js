/**
 *
 */
define([], function () {
    "use strict";

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    return function (attr) {
        if (attr == null || !this._previousAttributes) {
            return null;
        }
        return this._previousAttributes[attr];
    };
});