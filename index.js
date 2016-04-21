var self = require("sdk/self");

var button = require("sdk/ui/button/action").ActionButton({
    id: "mendeley-tab",
    label: "Mendeley Tab",
    icon: "./icon-64.png",
    onClick: function() {
        require("sdk/tabs").activeTab.attach({
            contentScriptFile: self.data.url("call.js")
        });
    }
});
