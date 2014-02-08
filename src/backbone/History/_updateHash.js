define([

], function () {
    "use strict";

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    return function(location, fragment, replace) {
        if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
        } else {
            // Some browsers require that `hash` contains a leading #.
            location.hash = '#' + fragment;
        }
    }
});