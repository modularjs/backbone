define(['underscore/objects/extend'], function (extend) {
    "use strict";

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    return function (attr, options) {
        return this.set(attr, void 0, extend({}, options, {unset: true}));
    };
});