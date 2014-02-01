define(['underscore/objects/isFunction'], function (isFunction) {
    "use strict";

    return function (object, prop) {
        if (!(object && object[prop])) return null;
        return isFunction(object[prop]) ? object[prop]() : object[prop];
    };
});