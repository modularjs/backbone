/**
 *
 */
define([
    'backbone/util/extend',
    'underscore/objects/extend',
    'underscore/objects/clone',
    'backbone/Events',
    'backbone/Model',
    'backbone/Collection/set',
    'backbone/Collection/remove',
    'backbone/Collection/reset',
    'backbone/Collection/sort',
    'backbone/Collection/where',
    'es5/Array/slice',
    // underscore methods:
    'underscore/collections/each',
    'underscore/collections/sortBy',
    'underscore/collections/invoke',
    'underscore/collections/filter',
    'underscore/collections/find',
    'underscore/collections/map',
    'underscore/collections/some',
    'underscore/collections/size',
    'underscore/collections/contains',
    'underscore/collections/max',
    'underscore/collections/min',
    'underscore/collections/sample',
    'underscore/collections/indexBy',
    'underscore/collections/groupBy',
    'underscore/objects/keys',
    'underscore/objects/isFunction',
    'underscore/objects/isEmpty',
    'underscore/arrays/indexOf',
    'underscore/arrays/difference',
    'underscore/arrays/first',
    'underscore/arrays/last',
    'underscore/arrays/rest',
    'underscore/arrays/without'
], function (backboneExtend, extend, clone, Events, Model, set, remove, reset, sort, where, slice, each, sortBy, invoke, filter, find, map, some, size, contains, max, min, sample, indexBy, groupBy, keys, isFunction, isEmpty, indexOf, difference, first, last, rest, without) {
    "use strict";

    var Collection = function (models, options) {
        options || (options = {});
        if (options.model) {
            this.model = options.model;
        }
        if (options.comparator !== void 0) {
            this.comparator = options.comparator;
        }
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) {
            this.reset(models, extend({silent: true}, options));
        }
    };

    Collection.extend = backboneExtend;

    // Default options for `Collection#set`.
    var addOptions = {add: true, remove: false};

    extend(Collection.prototype, Events, {

        // The default model for a collection is just a **Backbone.Model**.
        // This should be overridden in most cases.
        model: Model,

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function () {
        },

        // Add a model, or list of models to the set.
        add: function (models, options) {
            return this.set(models, extend({merge: false}, options, addOptions));
        },

        set: set,
        reset: reset,
        remove: remove,
        sort: sort,
        where: where,

        // Return the first model with matching attributes. Useful for simple cases
        // of `find`.
        findWhere: function(attrs) {
            return this.where(attrs, true);
        },

        // Get a model from the set by id.
        get: function (obj) {
            if (obj == null) {
                return void 0;
            }
            return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
        },

        // Pluck an attribute from each model in the collection.
        pluck: function(attr) {
            return invoke(this.models, 'get', attr);
        },

        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function(resp, options) {
            return resp;
        },

        // Get the model at the given index.
        at: function(index) {
            return this.models[index];
        },

        // Add a model to the beginning of the collection.
        unshift: function(model, options) {
            return this.add(model, extend({at: 0}, options));
        },

        // Remove a model from the beginning of the collection.
        shift: function(options) {
            var model = this.at(0);
            this.remove(model, options);
            return model;
        },

        // Remove a model from the end of the collection.
        pop: function(options) {
            var model = this.at(this.length - 1);
            this.remove(model, options);
            return model;
        },

        // Add a model to the end of the collection.
        push: function(model, options) {
            return this.add(model, extend({at: this.length}, options));
        },

        // The JSON representation of a Collection is an array of the
        // models' attributes.
        toJSON: function(options) {
            return this.map(function(model){ return model.toJSON(options); });
        },

        // Slice out a sub-array of models from the collection.
        slice: function() {
            return slice.apply(this.models, arguments);
        },

        // Private method to reset all internal state. Called when the collection
        // is first initialized or reset.
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
        },

        // Prepare a hash of attributes (or other model) to be added to this
        // collection.
        _prepareModel: function (attrs, options) {
            if (attrs instanceof Model) {
                return attrs;
            }
            options = options ? clone(options) : {};
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model.validationError) {
                return model;
            }
            this.trigger('invalid', this, model.validationError, options);
            return false;
        },

        // Internal method to create a model's ties to a collection.
        _addReference: function (model, options) {
            this._byId[model.cid] = model;
            if (model.id != null) {
                this._byId[model.id] = model;
            }
            if (!model.collection) {
                model.collection = this;
            }
            model.on('all', this._onModelEvent, this);
        },


        // Internal method to sever a model's ties to a collection.
        _removeReference: function (model, options) {
            delete this._byId[model.id];
            delete this._byId[model.cid];
            if (this === model.collection) {
                delete model.collection;
            }
            model.off('all', this._onModelEvent, this);
        },

        // Internal method called every time a model in the set fires an event.
        // Sets need to update their indexes when models change ids. All other
        // events simply proxy through. "add" and "remove" events that originate
        // in other collections are ignored.
        _onModelEvent: function (event, model, collection, options) {
            if ((event === 'add' || event === 'remove') && collection !== this) {
                return;
            }
            if (event === 'destroy') {
                this.remove(model, options);
            }
            if (model && event === 'change:' + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                if (model.id != null) {
                    this._byId[model.id] = model;
                }
            }
            this.trigger.apply(this, arguments);
        }
    });

    // Underscore methods that we want to implement on the Collection.
    // 90% of the core usefulness of Backbone Collections is actually implemented
    // right here:
    var collectionMethods = {
        'indexOf': indexOf,
        'first': first,
        'last': last,
        'filter': filter,
        'map': map,
        'find': find,
        'size': size,
        'rest': rest,
        'include': contains,
        'isEmpty': isEmpty,
        'without': without,
        'max': max,
        'min': min,
        'difference': difference,
        'sample': sample,
        'each': each,
        'any': some
    };

    each(keys(collectionMethods), function (methodKey) {
        Collection.prototype[methodKey] = function () {
            var args = slice.call(arguments);
            args.unshift(this.models);
            return collectionMethods[methodKey].apply(null, args);
        };
    });

    // Underscore methods that take a property name as an argument.
    var attributeCollectionMethods = {
        'sortBy': sortBy,
        'indexBy': indexBy,
        'groupBy': groupBy
    };

    // Use attributes instead of properties.
    each(keys(attributeCollectionMethods), function (methodKey) {
        Collection.prototype[methodKey] = function(value, context) {
            var iterator = isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return attributeCollectionMethods[methodKey](this.models, iterator, context);
        };
    });

    return Collection;

});