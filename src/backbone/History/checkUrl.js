define([

], function () {
    "use strict";

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    return function(e) {
        var current = this.getFragment();
        if (current === this.fragment && this.iframe) {
            current = this.getFragment(this.getHash(this.iframe));
        }
        if (current === this.fragment) {
            return false;
        }
        if (this.iframe) {
            this.navigate(current);
        }
        this.loadUrl();
    };
});