define([
    'es5/Array/slice',
    'underscore/collections/each',
    'underscore/collections/map',
    'underscore/internal/placeholder'
], function (slice, each, map, placeholder) {
    "use strict";

    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    return function(func) {
        var boundArgs = slice.call(arguments, 1);
        return function() {
            var args = slice.call(boundArgs);
            each(arguments, function(arg) {
                var index = args.indexOf(placeholder);
                args[index >= 0 ? index : args.length] = arg;
            });
            return func.apply(this, map(args, function(value) {
                return value === placeholder ? void 0 : value;
            }));
        };
    };

});