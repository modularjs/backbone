define(['underscore/utility/entityMap', 'underscore/objects/keys'], function (entityMap, keys) {
    "use strict";

    var entityRegex = new RegExp('(' + keys(entityMap.unescape).join('|') + ')', 'g');

    // Unescape a string from HTML interpolation.
    return function (string) {
        if (string == null) return '';
        return ('' + string).replace(entityRegex, function(match) {
            return entityMap.unescape[match];
        });
    };
});