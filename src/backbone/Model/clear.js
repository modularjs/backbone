define(['underscore/objects/extend'], function (extend) {
    "use strict";

    // Clear all attributes on the model, firing `"change"`.
    return function (options) {
        var attrs = {};
        for (var key in this.attributes) { attrs[key] = void 0; }
        return this.set(attrs, extend({}, options, {unset: true}));
    };
});