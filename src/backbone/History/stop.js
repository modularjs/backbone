define([
    'backbone/View/native/off',
    'backbone/History/started'
], function (off, started) {
    "use strict";

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    return function() {
        off(window, 'popstate', this.checkUrl);
        off(window, 'hashchange', this.checkUrl);
        clearInterval(this._checkUrlInterval);
        started.setStopped();
    }
});