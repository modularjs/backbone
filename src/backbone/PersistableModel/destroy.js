/**
 *
 */
define([
    'underscore/objects/clone',
    'backbone/util/wrapError'
], function (clone, wrapError) {
    "use strict";

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    return function (options) {

        options = options ? clone(options) : {};
        var model = this;
        var success = options.success;

        var destroy = function() {
            model.trigger('destroy', model, model.collection, options);
        };

        options.success = function(resp) {
            if (options.wait || model.isNew()) {
                destroy();
            }
            if (success) {
                success(model, resp, options);
            }
            if (!model.isNew()) {
                model.trigger('sync', model, resp, options);
            }
        };

        if (this.isNew()) {
            options.success();
            return false;
        }
        wrapError(this, options);

        var xhr = this.sync('delete', this, options);
        if (!options.wait) {
            destroy();
        }
        return xhr;
    };

});