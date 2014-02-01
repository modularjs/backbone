/**
 *
 */
define(['underscore/objects/isString', 'underscore/functions/bind'], function (isString, bind) {
    "use strict";

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    return function(options) {
        if (!this.comparator) {
            throw new Error('Cannot sort a set without a comparator');
        }
        options || (options = {});

        // Run sort based on type of `comparator`.
        if (isString(this.comparator) || this.comparator.length === 1) {
            this.models = this.sortBy(this.comparator, this);
        } else {
            this.models.sort(bind(this.comparator, this));
        }

        if (!options.silent) {
            this.trigger('sort', this, options);
        }
        return this;
    }
});