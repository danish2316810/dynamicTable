
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Label",
  "sap/m/ToolbarSpacer",
  "sap/m/Button",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], function(Controller, Column, Text, Input, Label, ToolbarSpacer, Button,JSONModel,MessageBox) {
  "use strict";

  return Controller.extend("usib.app.dan.usidappdandynamictable.controller.DetailView", {
    onInit: function() {
      this._config = {
    Nomination: {
      columns: ["ID", "NominationId", "StartDate", "EndDate"]
    },
    Contract: {
      columns: ["ID","ContractId", "Supplier"]
    }
  };
      let oRouter=this.getOwnerComponent().getRouter()
      oRouter.getRoute("RouteDetailView").attachPatternMatched(this._onObjectMatched, this);
          // oRouter.attachPatternMatched(this.onRouteMatched,this)
           
    },
    _onObjectMatched:function(oEvent){
          let sPath=oEvent.getParameter("arguments").id;
          let sType = oEvent.getParameter("arguments").type;
          let finalPath=`/${sType}s('${sPath}')`
          let oView = this.getView();
          // Clear old binding and dynamic content
          oView.unbindElement();
          oView.byId("detailBox").destroyItems();       
          
               this.getView().bindElement(finalPath);

              // now build UI dynamically
              this._buildDetailPage(sType);
    },
   _buildDetailPage: function(sType) {
      let cfg = this._config[sType]; 
      let oVBox = this.getView().byId("detailBox");

      oVBox.removeAllItems();

      cfg.columns.forEach(field => {
        oVBox.addItem(new sap.m.HBox({
          items: [
            new sap.m.Label({ text: field + ": ", width: "150px" }),
            new sap.m.Text({ text: "{" + field + "}" })
          ]
        }));
      });
    }

     

    

    

  });
});









// sap.ui.define([
//   "sap/ui/core/mvc/Controller",
//   "sap/m/Column",
//   "sap/m/Text",
//   "sap/m/Input",
//   "sap/m/Label",
//   "sap/m/ToolbarSpacer",
//   "sap/m/Button",
//   "sap/ui/model/json/JSONModel",
//   "sap/m/MessageBox"
// ], function(Controller, Column, Text, Input, Label, ToolbarSpacer, Button, JSONModel, MessageBox) {
//   "use strict";

//   return Controller.extend("usib.app.dan.usidappdandynamictable.controller.DetailView", {
//     onInit: function() {
//       this._config = {
//         Nomination: {
//           columns: ["ID", "NominationId", "StartDate", "EndDate"]
//         },
//         Contract: {
//           columns: ["ID", "ContractId", "Supplier"]
//         }
//       };
//       let oRouter = this.getOwnerComponent().getRouter();
//       oRouter.getRoute("RouteDetailView").attachPatternMatched(this._onObjectMatched, this);
//     },

//     _onObjectMatched: function(oEvent) {
//       let sPath = oEvent.getParameter("arguments").id;
//       let sType = oEvent.getParameter("arguments").type;
//       let finalPath = `/${sType}s('${sPath}')`;
//       let oView = this.getView();

//       // Clear old binding and dynamic content
//       oView.unbindElement();
//       oView.byId("detailBox").destroyItems();

//       // Build the dynamic UI immediately for labels
//       this._buildDetailPage(sType);

//       // Then bind element to load data
//       oView.bindElement({
//         path: finalPath,
//         events: {
//           dataReceived: function() {
//             let oVBox = oView.byId("detailBox");
//             let oContext = oView.getBindingContext();
//             if (oContext) {
//               // Update the Text controls with actual data
//               oVBox.getItems().forEach(hbox => {
//                 let labelText = hbox.getItems()[0].getText().slice(0, -2); // remove ": "
//                 let valueControl = hbox.getItems()[1];
//                 valueControl.setText(oContext.getProperty(labelText) || "");
//               });
//             }
//           }
//         }
//       });
//     },

//     _buildDetailPage: function(sType) {
//       let cfg = this._config[sType]; 
//       let oVBox = this.getView().byId("detailBox");

//       oVBox.removeAllItems();

//       cfg.columns.forEach(field => {
//         oVBox.addItem(new sap.m.HBox({
//           items: [
//             new sap.m.Label({ text: field + ": ", width: "150px" }),
//             new sap.m.Text({ text: "{" + field + "}" })
//           ]
//         }));
//       });
//     }
//   });
// });

























