define([
    'es5/Array/reduce',
    'underscore/functions/bind',
    'underscore/collections/each'
], function (nativeReduce, bind, each) {
    "use strict";

    var reduceError = 'Reduce of empty array with no initial value';

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
    return function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) {
            obj = [];
        }
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
});