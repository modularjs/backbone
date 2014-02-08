define([
    'backbone/globalHistory'
], function (globalHistory) {
    "use strict";

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    return function(fragment, options) {
        (window.Backbone.history || globalHistory).navigate(fragment, options);
        return this;
    };
});