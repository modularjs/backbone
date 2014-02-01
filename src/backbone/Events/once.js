/**
 *
 */
define(['backbone/Events/eventsApi', 'underscore/functions/once'], function (eventsApi, underscoreOnce) {
    "use strict";

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    return function (name, callback, context) {
        if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
            return this;
        }
        var self = this;
        var once = underscoreOnce(function () {
            self.off(name, once);
            callback.apply(this, arguments);
        });
        once._callback = callback;
        return this.on(name, once, context);
    };
});