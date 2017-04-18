"use strict";
require("devextreme/ui/toolbar");
require("devextreme/ui/nav_bar");
(function(root, factory) {
    /* global define, DevExpress */
    if (typeof define === 'function' && define.amd) {
        define(function(require, exports, module) {
            module.exports = factory(
                require("devextreme/framework/html/presets").layoutSets,
                require("devextreme/framework/html/layout_controller").DefaultLayoutController
            );
        });
    } else {
        factory(
            DevExpress.framework.html.layoutSets,
            DevExpress.framework.html.DefaultLayoutController
        );
    }
}(window, function(layoutSets, DefaultLayoutController) {

    var exports = {};

    layoutSets["desktop"] = layoutSets["desktop"] || [];
    layoutSets["desktop"].push({
        platform: "generic",
        controller: new DefaultLayoutController({
            name: "desktop"
        })
    });

    return exports;

}));