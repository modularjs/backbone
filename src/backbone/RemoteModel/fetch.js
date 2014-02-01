define([
    'underscore/objects/clone',
    'backbone/util/wrapError'
], function (clone, wrapError) {
    "use strict";

    return function (options) {
        options = options ? clone(options) : {};
        if (options.parse === void 0) {
            options.parse = true;
        }
        var model = this;
        var success = options.success;
        options.success = function(resp) {
            if (!model.set(model.parse(resp, options), options)) {
                console.error("Model was not parsed correctly");
                return false;
            }
            if (success) {
                success(model, resp, options);
            }
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    };
});