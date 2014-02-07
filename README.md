Differs from original Backbone:
- collections do not support chaining
- view events only work in browsers that support window.Event constructor (that is Chrome, Firefox and IE9+)
- is() method on view.$el will work correctly, only if the element is attached to DOM-tree

Notes on automated tests:
- some of tests that rely on global ajaxSettings present fail, because start of every test will change QUnit's current environment.
These tests must not fail when they are run apart from other tests.
- some View tests use jQuery wrapper as el of the View. This is not supported by modular backbone, so we need to modify the tests to pass $("<p></p>").get(0) to the view
- this goes as well to tests, that trigger custom events using jQuery wrapper, instead of view.$el

     ____                     __      __
    /\  _`\                  /\ \    /\ \                                   __
    \ \ \ \ \     __      ___\ \ \/'\\ \ \____    ___     ___      __      /\_\    ____
     \ \  _ <'  /'__`\   /'___\ \ , < \ \ '__`\  / __`\ /' _ `\  /'__`\    \/\ \  /',__\
      \ \ \ \ \/\ \ \.\_/\ \__/\ \ \\`\\ \ \ \ \/\ \ \ \/\ \/\ \/\  __/  __ \ \ \/\__, `\
       \ \____/\ \__/.\_\ \____\\ \_\ \_\ \_,__/\ \____/\ \_\ \_\ \____\/\_\_\ \ \/\____/
        \/___/  \/__/\/_/\/____/ \/_/\/_/\/___/  \/___/  \/_/\/_/\/____/\/_/\ \_\ \/___/
                                                                           \ \____/
                                                                            \/___/
    (_'_______________________________________________________________________________'_)
    (_.———————————————————————————————————————————————————————————————————————————————._)


Backbone supplies structure to JavaScript-heavy applications by providing models key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing application over a RESTful JSON interface.

For Docs, License, Tests, pre-packed downloads, and everything else, really, see:
http://backbonejs.org

To suggest a feature, report a bug, or general discussion:
http://github.com/jashkenas/backbone/issues

Backbone is an open-sourced component of DocumentCloud:
https://github.com/documentcloud

Many thanks to our contributors:
http://github.com/jashkenas/backbone/contributors

Special thanks to Robert Kieffer for the original philosophy behind Backbone.
http://github.com/broofa
