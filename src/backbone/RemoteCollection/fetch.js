/**
 *
 */
define(['underscore/objects/clone', 'backbone/util/wrapError'], function (clone, wrapError) {
    "use strict";


    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    return function(options) {
        options = options ? clone(options) : {};
        if (options.parse === void 0) {
            options.parse = true;
        }
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp, options);
            if (success) {
                success(collection, resp, options);
            }
            collection.trigger('sync', collection, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    };

});