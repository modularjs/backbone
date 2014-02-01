define([], function () {
    "use strict";

    // Wrap an optional error callback with a fallback error event.
    return function (model, options) {
        var error = options.error;
        options.error = function(resp) {
            if (error) {
                error(model, resp, options);
            }
            model.trigger('error', model, resp, options);
        };
    };
});