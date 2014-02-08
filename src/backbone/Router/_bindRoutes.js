define([
    'underscore/objects/keys',
    'underscore/utility/result'
], function (keys, result) {
    "use strict";

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    return function() {
        if (!this.routes) {
            return;
        }
        this.routes = result(this, 'routes');
        var route, routes = keys(this.routes);
        while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
        }
    }
});