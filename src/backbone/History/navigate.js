define([
    'backbone/History/started'
], function (started) {
    "use strict";

    // Cached regex for stripping urls of hash.
    var pathStripper = /#.*$/;

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    return function(fragment, options) {
        if (!started.isStarted()) {
            return false;
        }
        if (!options || options === true) {
            options = {trigger: !!options};
        }

        var url = this.root + (fragment = this.getFragment(fragment || ''));

        // Strip the hash for matching.
        fragment = fragment.replace(pathStripper, '');

        if (this.fragment === fragment) {
            return;
        }
        this.fragment = fragment;

        // Don't include a trailing slash on the root.
        if (fragment === '' && url !== '/') {
            url = url.slice(0, -1);
        }

        // If pushState is available, we use it to set the fragment as a real URL.
        if (this._hasPushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

            // If hash changes haven't been explicitly disabled, update the hash
            // fragment to store history.
        } else if (this._wantsHashChange) {
            this._updateHash(this.location, fragment, options.replace);
            if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
                // Opening and closing the iframe tricks IE7 and earlier to push a
                // history entry on hash-tag change.  When replace is true, we don't
                // want this.
                if(!options.replace) this.iframe.document.open().close();
                this._updateHash(this.iframe.location, fragment, options.replace);
            }

            // If you've told us that you explicitly don't want fallback hashchange-
            // based history, then `navigate` becomes a page refresh.
        } else {
            return this.location.assign(url);
        }
        if (options.trigger) return this.loadUrl(fragment);
    };
});