define([
    'backbone/Events',
    'backbone/util/extend',
    'backbone/Router/_bindRoutes',
    'backbone/Router/_extractParameters',
    'backbone/Router/_routeToRegExp',
    'backbone/Router/navigate',
    'backbone/Router/route',
    'underscore/objects/extend'
], function (Events, backboneExtend, _bindRoutes, _extractParameters, _routeToRegExp, navigate, route, extend) {
    "use strict";

    // Routers map faux-URLs to actions, and fire events when routes are
    // matched. Creating a new one sets its `routes` hash, if not set statically.
    var Router = function(options) {
        options || (options = {});
        if (options.routes) {
            this.routes = options.routes;
        }
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };

    extend(Router.prototype, Events, {
        _bindRoutes: _bindRoutes,
        _extractParameters: _extractParameters,
        _routeToRegExp: _routeToRegExp,

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // Execute a route handler with the provided parameters.  This is an
        // excellent place to do pre-route setup or post-route cleanup.
        execute: function(callback, args) {
            if (callback) {
                callback.apply(this, args);
            }
        },

        navigate: navigate,
        route: route
    });

    Router.extend = backboneExtend;

    return Router;

});