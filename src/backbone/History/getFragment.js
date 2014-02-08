define([

], function () {
    "use strict";

    // Cached regex for removing a trailing slash.
    var trailingSlash = /\/$/;

    // Cached regex for stripping a leading hash/slash and trailing space.
    var routeStripper = /^[#\/]|\s+$/g;

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    return function(fragment, forcePushState) {
        if (fragment == null) {
            if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                fragment = decodeURI(this.location.pathname + this.location.search);
                var root = this.root.replace(trailingSlash, '');
                if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
            } else {
                fragment = this.getHash();
            }
        }
        return fragment.replace(routeStripper, '');
    }
});