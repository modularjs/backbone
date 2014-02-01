/**
 *
 */
define(['es5/Array/lastIndexOf'], function (nativeLastIndexOf) {
    "use strict";

    // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
    return function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--) if (array[i] === item) return i;
        return -1;
    };

});