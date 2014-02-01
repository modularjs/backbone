/**
 * If the value of the named property is a function then invoke it with the object as context; otherwise, return it.
 */
define(['underscore/objects/isFunction'], function (isFunction) {
    return function(object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return isFunction(value) ? value.call(object) : value;
    };
});