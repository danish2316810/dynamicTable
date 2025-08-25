sap.ui.define([
    "sap/ui/core/UIComponent",
    "usib/app/dan/usidappdandynamictable/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("usib.app.dan.usidappdandynamictable.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            let oRouter=this.getRouter()
            oRouter.initialize();
            oRouter.navTo("RouteTableView", {}, true);
        }
    });
});