/**
 *
 */
define([
    'es5/Function/bind',
    'es5/Array/slice',
    'es5/Error/TypeError',
    'underscore/objects/isFunction'
], function (nativeBind, slice, TypeError, isFunction) {
    "use strict";

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    return  function(func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) {
            return nativeBind.apply(func, slice.call(arguments, 1));
        }
        if (isFunction(func)) {
            throw new TypeError();
        }
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) {
                return func.apply(context, args.concat(slice.call(arguments)));
            }
            var ctor = function () {};
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) {
                return result;
            }
            return self;
        };
    };

});