/**
 *
 */
define(['es5/Array/indexOf', 'underscore/arrays/sortedIndex'], function (nativeIndexOf, sortedIndex) {
    "use strict";


    // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
    // we need this function. Return the position of the first occurrence of an
    // item in an array, or -1 if the item is not included in the array.
    // Delegates to **ECMAScript 5**'s native `indexOf` if available.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    return function (array, item, isSorted) {
        if (array == null) {
            return -1;
        }
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
            } else {
                i = sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) {
            return array.indexOf(item, isSorted);
        }
        for (; i < length; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    };
});