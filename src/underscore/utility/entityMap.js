define([
    'underscore/objects/invert'
], function (invert) {
    "use strict";

    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    entityMap.unescape = invert(entityMap.escape);

    return entityMap;
});