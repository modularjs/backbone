define(['underscore/utility/entityMap', 'underscore/objects/keys'], function (entityMap, keys) {
    "use strict";

    var entityRegex = new RegExp('[' + keys(entityMap.escape).join('') + ']', 'g');

    // Escape a string for HTML interpolation.
    return function (string) {
        if (string == null) return '';
        return ('' + string).replace(entityRegex, function(match) {
            return entityMap.escape[match];
        });
    };
});