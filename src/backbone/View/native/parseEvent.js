/**
 * @see https://github.com/milesj/backbone/blob/master/adapters/backbone-vanilla.js
 */
define([], function () {
    "use strict";

    // Parse out the event type and namespace
    return function (eventName) {
        var type, ns;

        if (String(eventName).indexOf('.') >= 0) {
            eventName = eventName.split('.', 2);

            type = eventName[0];
            ns = eventName[1];
        } else {
            type = eventName;
        }

        return {
            type: type,
            namespace: ns
        };
    };

});