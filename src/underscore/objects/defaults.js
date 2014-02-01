/**
 * Fill in undefined properties in object with values from the defaults objects, and return the object.
 * As soon as the property is filled, further defaults will have no effect.
 */
define(['underscore/collections/each', 'es5/Array/slice'], function (each, slice) {

    return function (obj) {

        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;

    };

});