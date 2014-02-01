define([
    'es5/Array/slice',
    'underscore/collections/filter',
    'underscore/collections/every',
    'underscore/arrays/indexOf',
    'underscore/arrays/uniq'
], function (slice, filter, every, indexOf, uniq) {
    "use strict";

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    return function(array) {
        var rest = slice.call(arguments, 1);
        return filter(uniq(array), function(item) {
            return every(rest, function(other) {
                return indexOf(other, item) >= 0;
            });
        });
    };

});