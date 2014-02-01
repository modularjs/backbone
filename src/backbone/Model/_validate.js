define(['underscore/objects/extend'], function (extend) {
    "use strict";

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    return function (attrs, options) {
        if (!options.validate || !this.validate) {
            return true;
        }
        attrs = extend({}, this.attributes, attrs);
        var error = this.validationError = this.validate(attrs, options) || null;
        if (!error) {
            return true;
        }
        this.trigger('invalid', this, error, extend(options, {validationError: error}));
        return false;
    };
});