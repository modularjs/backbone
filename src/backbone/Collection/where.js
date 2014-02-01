/**
 *
 */
define(['underscore/objects/isEmpty'], function (isEmpty) {
    "use strict";

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    return function(attrs, first) {
        if (isEmpty(attrs)) {
            return first ? void 0 : [];
        }
        return this[first ? 'find' : 'filter'](function(model) {
            for (var key in attrs) {
                if (attrs[key] !== model.get(key)) {
                    return false;
                }
            }
            return true;
        });
    };
});