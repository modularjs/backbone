define([
    'es5/Array/slice',
    'underscore/collections/each',
    'underscore/functions/bind'
], function (slice, each, bind) {
    "use strict";

    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    return function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length === 0) throw new Error("bindAll must be passed function names");
        each(funcs, function(f) { obj[f] = bind(obj[f], obj); });
        return obj;
    };
});