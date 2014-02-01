define([
    'underscore/objects/extend',
    'underscore/objects/isEmpty',
    'underscore/objects/clone'
], function (extend, isEmpty, clone) {
    "use strict";

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    return function (options) {
        options || (options = {});
        var changing = this._changing;
        this._changing = true;

        // Silent changes become pending changes.
        for (var attr in this._silent) this._pending[attr] = true;

        // Silent changes are triggered.
        var changes = extend({}, options.changes, this._silent);
        this._silent = {};
        for (var attr in changes) {
            this.trigger('change:' + attr, this, this.get(attr), options);
        }
        if (changing) return this;

        // Continue firing `"change"` events while there are pending changes.
        while (!isEmpty(this._pending)) {
            this._pending = {};
            this.trigger('change', this, options);
            // Pending and silent changes still remain.
            for (var attr in this.changed) {
                if (this._pending[attr] || this._silent[attr]) continue;
                delete this.changed[attr];
            }
            this._previousAttributes = clone(this.attributes);
        }

        this._changing = false;
        return this;
    };
});