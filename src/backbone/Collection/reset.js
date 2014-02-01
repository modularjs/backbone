/**
 *
 */
define(['underscore/objects/extend'], function (extend) {
    "use strict";

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    return function(models, options) {
        options || (options = {});
        for (var i = 0, l = this.models.length; i < l; i++) {
            this._removeReference(this.models[i], options);
        }
        options.previousModels = this.models;
        this._reset();
        models = this.add(models, extend({silent: true}, options));
        if (!options.silent) {
            this.trigger('reset', this, options);
        }
        return models;
    };

});