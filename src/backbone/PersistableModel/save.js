/**
 *
 */
define([
    'underscore/objects/extend',
    'underscore/objects/isObject',
    'backbone/util/wrapError'
], function (extend, isObject, wrapError) {
    "use strict";

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    return function (key, val, options) {
        var attrs, method, xhr, attributes = this.attributes;

        // Handle both `"key", value` and `{key: value}` -style arguments.
        if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options = extend({validate: true}, options);

        // If we're not waiting and attributes exist, save acts as
        // `set(attr).save(null, opts)` with validation. Otherwise, check if
        // the model will be valid when the attributes, if any, are set.
        if (attrs && !options.wait) {
            if (!this.set(attrs, options)) {
                return false;
            }
        } else {
            if (!this._validate(attrs, options)) {
                return false;
            }
        }

        // Set temporary attributes if `{wait: true}`.
        if (attrs && options.wait) {
            this.attributes = extend({}, attributes, attrs);
        }

        // After a successful server-side save, the client is (optionally)
        // updated with the server-side state.
        if (options.parse === void 0) {
            options.parse = true;
        }
        var model = this;
        var success = options.success;
        options.success = function (resp) {
            // Ensure attributes are restored during synchronous saves.
            model.attributes = attributes;
            var serverAttrs = model.parse(resp, options);
            if (options.wait) {
                serverAttrs = extend(attrs || {}, serverAttrs);
            }
            if (isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                return false;
            }
            if (success) {
                success(model, resp, options);
            }
            model.trigger('sync', model, resp, options);
        };
        wrapError(this, options);

        method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
        if (method === 'patch') {
            options.attrs = attrs;
        }
        xhr = this.sync(method, this, options);

        // Restore attributes.
        if (attrs && options.wait) {
            this.attributes = attributes;
        }

        return xhr;
    };

});