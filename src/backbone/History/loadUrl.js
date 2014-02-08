define([
    'underscore/collections/some'
], function (some) {
    "use strict";

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    return function(fragment) {
        fragment = this.fragment = this.getFragment(fragment);
        return some(this.handlers, function(handler) {
            if (handler.route.test(fragment)) {
                handler.callback(fragment);
                return true;
            }
        });
    }
});