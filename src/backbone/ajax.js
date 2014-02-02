define(['backbone/native/ajax'], function ($ajax) {
    "use strict";

    return function () {
        return $ajax.apply(this, arguments);
    };
});