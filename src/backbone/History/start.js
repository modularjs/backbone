define([
    'backbone/History/started',
    'backbone/View/native/on',
    'underscore/objects/extend'
], function (started, on, extend) {
    "use strict";

    // Cached regex for stripping a leading hash/slash and trailing space.
    var routeStripper = /^[#\/]|\s+$/g;

    // Cached regex for stripping leading and trailing slashes.
    var rootStripper = /^\/+|\/+$/g;

    // Cached regex for detecting MSIE.
    var isExplorer = /msie [\w.]+/;

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    return function(options) {
        if (started.isStarted()) {
            throw new Error("Backbone.history has already been started");
        }
        started.setStarted();

        // Figure out the initial configuration. Do we need an iframe?
        // Is pushState desired ... is it available?
        this.options          = extend({root: '/'}, this.options, options);
        this.root             = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._wantsPushState  = !!this.options.pushState;
        this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
        var fragment          = this.getFragment();
        var docMode           = document.documentMode;
        var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

        // Normalize root to always include a leading and trailing slash.
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');

        if (oldIE && this._wantsHashChange) {
            var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
            this.iframe = frame.hide().appendTo('body')[0].contentWindow;
            this.navigate(fragment);
        }

        // Depending on whether we're using pushState or hashes, and whether
        // 'onhashchange' is supported, determine how we check the URL state.
        if (this._hasPushState) {
            on(window, 'popstate', this.checkUrl);
        } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
            on(window, 'hashchange', this.checkUrl);
        } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
        }

        // Determine if we need to change the base url, for a pushState link
        // opened by a non-pushState browser.
        this.fragment = fragment;
        var loc = this.location;

        // Transition from hashChange to pushState or vice versa if both are
        // requested.
        if (this._wantsHashChange && this._wantsPushState) {

            // If we've started off with a route from a `pushState`-enabled
            // browser, but we're currently in a browser that doesn't support it...
            if (!this._hasPushState && !this.atRoot()) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + '#' + this.fragment);
                // Return immediately as browser will do redirect to new url
                return true;

                // Or if we've started out with a hash-based route, but we're currently
                // in a browser where it could be `pushState`-based instead...
            } else if (this._hasPushState && this.atRoot() && loc.hash) {
                this.fragment = this.getHash().replace(routeStripper, '');
                this.history.replaceState({}, document.title, this.root + this.fragment);
            }

        }

        if (!this.options.silent) {
            return this.loadUrl();
        }
    };
});