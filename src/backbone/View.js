/**
 *
 */
define([
    'backbone/Events',
    'backbone/util/extend',
    'underscore/utility/uniqueId',
    'underscore/utility/result',
    'underscore/objects/extend',
    'underscore/objects/pick',
    'backbone/View/native/createElement',
    // view methods:
    'backbone/View/setElement',
    'backbone/View/delegateEvents',
    'backbone/View/undelegateEvents'
], function (Events, backboneExtend, uniqueId, result, extend, pick, createElement, /*$attrs,*/ setElement, delegateEvents, undelegateEvents) {
    "use strict";

    // Backbone Views are almost more convention than they are actual code. A View
    // is simply a JavaScript object that represents a logical chunk of UI in the
    // DOM. This might be a single item, an entire list, a sidebar or panel, or
    // even the surrounding frame which wraps your whole app. Defining a chunk of
    // UI as a **View** allows you to define your DOM events declaratively, without
    // having to worry about render order ... and makes it easy for the view to
    // react to specific changes in the state of your models.

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    var View = function (options) {
        this.cid = uniqueId('view');
        options || (options = {});
        extend(this, pick(options, viewOptions));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.eventHandlers = [];
        this.delegateEvents();
    };


    // List of view options to be merged as properties.
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

    extend(View.prototype, Events, {

        // The default `tagName` of a View's element is `"div"`.
        tagName: 'div',

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // **render** is the core function that your view should override, in order
        // to populate its element (`this.el`), with the appropriate HTML. The
        // convention is for **render** to always return `this`.
        render: function() {
            return this;
        },

        setElement: setElement,
        delegateEvents: delegateEvents,
        undelegateEvents: undelegateEvents,

        $: function (selector) {
            return this.$el.find(selector);
        },

        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function() {
            if (!this.el) {
                var attributes = extend({}, result(this, 'attributes'));
                if (this.id) {
                    attributes.id = result(this, 'id');
                }
                if (this.className) {
                    attributes['class'] = result(this, 'className');
                }
                var $el = createElement(result(this, 'tagName')).attr(attributes);
                this.setElement($el, false);
            } else {
                this.setElement(result(this, 'el'), false);
            }
        }
    });

    // Set up inheritance for the model
    View.extend = backboneExtend;

    return View;
});