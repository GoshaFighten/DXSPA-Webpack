var $ = require("jquery");
var ko = require('knockout');
require('devextreme/dist/css/dx.common.css');
require('devextreme/dist/css/dx.spa.css');
require('devextreme/dist/css/dx.light.css');
require('devextreme/integration/knockout');

require("devextreme/framework/html/command_container")

var htmlApp = require("devextreme/framework/html/html_application");
require("devextreme/framework/html/view_engine_components");
require("devextreme/framework/router");
require("devextreme/framework/state_manager");
require("devextreme/framework/view_cache");
var devices = require("devextreme/core/devices");
var hardwareButton = require("devextreme/mobile/process_hardware_back_button");
var layoutSets = require("devextreme/framework/html/presets").layoutSets

require("./layouts/Desktop/DesktopLayout.css");
require("./layouts/Desktop/DesktopLayout.js");
var layout = require("./layouts/Desktop/DesktopLayout.html");

require("./views/home.css");
var vmHome = require("./views/home");
var home = require("./views/home.html");
var about = require("./views/about.html");

Application1 = {};

$(function () {
    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        $(document).on("backbutton", function () {
            hardwareButton();
        });
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !Application1.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                MSApp.terminateApp('');
                break;
        }
    }

    Application1.app = new htmlApp({
        namespace: Application1,
        layoutSet: layoutSets["desktop"],
        navigation: [
            {
                title: "Home",
                onExecute: "#home",
                icon: "home"
            },
            {
                title: "About",
                onExecute: "#about",
                icon: "info"
            }
        ]
    });
    Application1.app.loadTemplates($(layout));
    Application1.app.loadTemplates($(home));
    Application1.app.loadTemplates($(about));
    Application1.home = vmHome.default;
    Application1.app.router.register(":view/:id", { view: "home", id: undefined });
    Application1.app.on("navigatingBack", onNavigatingBack);
    Application1.app.navigate();
});
