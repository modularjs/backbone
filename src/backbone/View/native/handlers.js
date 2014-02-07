define([

], function () {
    "use strict";

    var cacheKeyProp = 'backboneNativeKey' + Math.random();
    var id = 1;
    var handlers = {};
    var unusedKeys = [];

    return {
        /**
         * Get the event handlers for a given element, creating an empty set if one doesn't exist.
         *
         * To avoid constantly filling the handlers object with null values, we reuse old IDs that
         * have been created and then cleared.
         *
         * @param {Element} el The element to get handlers for.
         *
         * @return {Array} An array of handlers.
         */
        handlersFor: function (el) {
            if (!el[cacheKeyProp]) {
                // Pick a new key, from the unused pool, or make a new one.
                el[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
            }

            var cacheKey = el[cacheKeyProp];
            return handlers[cacheKey] || (handlers[cacheKey] = []);
        },
        /**
         * Clear the event handlers for a given element.
         *
         * @param {Element} el The element to clear.
         */
        clearHandlers: function (el) {
            var cacheKey = el[cacheKeyProp];
            if (handlers[cacheKey]) {
                handlers[cacheKey] = null;
                el[cacheKeyProp] = null;
                unusedKeys.push(cacheKey);
            }
        }
    };


});