define([
    'backbone/globalHistory',
    'underscore/objects/isFunction',
    'underscore/objects/isRegExp'
], function (globalHistory, isFunction, isRegExp) {
    "use strict";

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    return function(route, name, callback) {
        if (!isRegExp(route)) {
            route = this._routeToRegExp(route);
        }
        if (isFunction(name)) {
            callback = name;
            name = '';
        }
        if (!callback) {
            callback = this[name];
        }
        var router = this;
        var history = globalHistory;
        if (window.Backbone && window.Backbone.history) {
            history = window.Backbone.history;
        }
        history.route(route, function(fragment) {
            var args = router._extractParameters(route, fragment);
            router.execute(callback, args);
            router.trigger.apply(router, ['route:' + name].concat(args));
            router.trigger('route', name, args);
            (window.Backbone.history || globalHistory).trigger('route', router, name, args);
        });
        return this;
    }
});