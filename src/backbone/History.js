define([
    'underscore/functions/bindAll',
    'underscore/objects/extend',
    'backbone/Events',
    'backbone/History/_updateHash',
    'backbone/History/checkUrl',
    'backbone/History/getFragment',
    'backbone/History/getHash',
    'backbone/History/loadUrl',
    'backbone/History/navigate',
    'backbone/History/start',
    'backbone/History/stop'
], function (bindAll, extend, Events, _updateHash, checkUrl, getFragment, getHash, loadUrl, navigate, start, stop) {
    "use strict";

    // Handles cross-browser history management, based on either
    // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
    // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
    // and URL fragments. If the browser supports neither (old IE, natch),
    // falls back to polling.
    var History = function() {
        this.handlers = [];
        bindAll(this, 'checkUrl');

        // Ensure that `History` can be used outside of the browser.
        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
    };

    extend(History.prototype, Events, {
        _updateHash: _updateHash,

        // Are we at the app root?
        atRoot: function() {
            return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
        },

        checkUrl: checkUrl,
        getFragment: getFragment,
        getHash: getHash,
        loadUrl: loadUrl,
        navigate: navigate,

        // Add a route to be tested when the fragment changes. Routes added later
        // may override previous routes.
        route: function(route, callback) {
            this.handlers.unshift({route: route, callback: callback});
        },

        start: start,
        stop: stop
    });

    return History;
});