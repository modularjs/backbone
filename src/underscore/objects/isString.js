define(['es5/Object/toString'], function (toString) {
    "use strict";

    return function (obj) {
        return toString.call(obj) == '[object String]';
    };
});