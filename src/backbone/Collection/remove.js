/**
 *
 */
define([
    'underscore/objects/isArray',
    'underscore/objects/clone',
], function (isArray, clone) {
    "use strict";

    // Remove a model, or a list of models from the set.
    return function(models, options) {
        var singular = !isArray(models);
        models = singular ? [models] : clone(models);
        options || (options = {});
        var i, l, index, model;
        for (i = 0, l = models.length; i < l; i++) {
            model = models[i] = this.get(models[i]);
            if (!model) {
                continue;
            }
            index = this.indexOf(model);
            this.models.splice(index, 1);
            this.length--;
            if (!options.silent) {
                options.index = index;
                model.trigger('remove', model, this, options);
            }
            this._removeReference(model, options);
        }
        return singular ? models[0] : models;
    };

});