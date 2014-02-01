define([], function () {
    "use strict";

    // Throw an error when a URL is needed, and none is supplied.
    return function () {
        throw new Error('A "url" property or function must be specified');
    };
});