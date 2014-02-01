/**
 *
 */
define(['underscore/objects/isEmpty', 'underscore/objects/has'], function (isEmpty, has) {
    "use strict";

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    return function (attr) {
        if (attr == null) {
            return !isEmpty(this.changed);
        }
        return has(this.changed, attr);
    };
});