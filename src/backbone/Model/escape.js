define(['underscore/utility/escape'], function (escape) {
    "use strict";

    return function (attr) {
        return escape(this.get(attr));
    };
});