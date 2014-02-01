define([
    'underscore/collections/every',
    'underscore/collections/each',
    'underscore/objects/isArray',
    'underscore/objects/isArguments',
    'es5/Array/concat'
], function (every, each, isArray, isArguments, concat) {
    "use strict";

    // Internal implementation of a recursive `flatten` function.
    var flatten = function(input, shallow, output) {
        if (shallow && every(input, isArray)) {
            return concat.apply(output, input);
        }
        each(input, function(value) {
            if (isArray(value) || isArguments(value)) {
                shallow ? Array.prototype.push.apply(output, value) : flatten(value, shallow, output);
            } else {
                output.push(value);
            }
        });
        return output;
    };

    // Flatten out an array, either recursively (by default), or just one level.
    return function(array, shallow) {
        return flatten(array, shallow, []);
    };

});