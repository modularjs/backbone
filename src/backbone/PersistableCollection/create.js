/**
 *
 */
define(['underscore/objects/clone'], function (clone) {
    "use strict";


    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    return function(model, options) {
        options = options ? clone(options) : {};
        if (!(model = this._prepareModel(model, options))) {
            return false;
        }
        if (!options.wait) {
            this.add(model, options);
        }
        var collection = this;
        var success = options.success;
        options.success = function(model, resp, options) {
            if (options.wait) {
                collection.add(model, options);
            }
            if (success) {
                success(model, resp, options);
            }
        };
        model.save(null, options);
        return model;
    };

});