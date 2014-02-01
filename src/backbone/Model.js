define([
    'backbone/util/extend',
    'underscore/objects/extend',
    'underscore/utility/uniqueId',
    'backbone/Events',
    'backbone/Model/get',
    'backbone/Model/set',
    'backbone/Model/change',
    'backbone/Model/hasChanged',
    'backbone/Model/changedAttributes',
    'backbone/Model/previous',
    'backbone/Model/previousAttributes',
    'backbone/Model/_validate',
    // additional features:
    'backbone/Model/escape',
    'backbone/Model/has',
    'backbone/Model/unset',
    'backbone/Model/clear',
    'backbone/Model/toJSON',
    'underscore/objects/defaults',
    'underscore/utility/result',
    'underscore/collections/each',
    'es5/Array/slice',
    // underscore methods:
    'underscore/objects/keys',
    'underscore/objects/values',
    'underscore/objects/pairs',
    'underscore/objects/invert',
    'underscore/objects/pick',
    'underscore/objects/omit'
], function (backboneExtend, extend, uniqueId, Events, get, set, change, hasChanged, changedAttributes,
             previous, previousAttributes, _validate, escape, has, unset, clear, toJSON, defaults, result, each, slice,
             keys, values, pairs, invert, pick, omit) {
    "use strict";

    var Model = function (attributes, options) {
        var attrs = attributes || {};
        options || (options = {});
        this.cid = uniqueId('c');
        this.attributes = {};
        if (options.collection) {
            this.collection = options.collection;
        }
        if (options.parse) {
            attrs = this.parse(attrs, options) || {};
        }
        attrs = defaults({}, attrs, result(this, 'defaults'));
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };

    extend(Model.prototype, Events, {
        // A hash of attributes whose current and previous value differ.
        changed: null,

        // A hash of attributes that have silently changed since the last time
        // `change` was called.  Will become pending attributes on the next call.
        _silent: null,

        // A hash of attributes that have changed since the last `'change'` event
        // began.
        _pending: null,

        // The default name for the JSON `id` attribute is `"id"`. MongoDB and
        // CouchDB users may want to set this to `"_id"`.
        idAttribute: 'id',

        /**
         * Initialize is an empty function by default. Override it with your own initialization logic.
         */
        initialize: function () {
        },
        toJSON: toJSON,
        get: get,
        escape: escape,
        has: has,
        set: set,
        unset: unset,
        clear: clear,
        change: change,
        hasChanged: hasChanged,
        changedAttributes: changedAttributes,
        previous: previous,
        previousAttributes: previousAttributes,
        _validate: _validate,
        // Create a new model with identical attributes to this one.
        clone: function() {
            return new this.constructor(this.attributes);
        },
        // Check if the model is currently in a valid state.
        isValid: function(options) {
            return this._validate({}, extend(options || {}, { validate: true }));
        }
    });

    // Set up inheritance for the model
    Model.extend = backboneExtend;


    var modelMethods = {
        'keys': keys,
        'values': values,
        'pairs': pairs,
        'invert': invert,
        'pick': pick,
        'omit': omit
    };

    each(keys(modelMethods), function (methodKey) {
        Model.prototype[methodKey] = function () {
            var args = slice.call(arguments);
            args.unshift(this.attributes);
            return modelMethods[methodKey].apply(null, args);
        };
    });

    return Model;
});