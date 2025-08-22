sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Label",
  "sap/m/ToolbarSpacer",
  "sap/m/Button",
  "sap/ui/model/json/JSONModel"
], function(Controller, Column, Text, Input, Label, ToolbarSpacer, Button,JSONModel) {
  "use strict";

  return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
    onInit: function() {
      // Config for tables + filters
      this._config = {
        Nomination: {
          entitySet: "/Nominations",
          columns: ["ID", "NominationId", "StartDate", "EndDate"],
          filters: ["NominationId", "StartDate", "EndDate"]
        },
        Contract: {
          entitySet: "/Contracts",
          columns: ["ID","ContractId", "Supplier"],
          filters: ["ContractId", "Supplier"]
        }
      };

      // Mock error types
      let oModel=new JSONModel()
         oModel.setData({
             errorTypes: [
          { key: "Nomination", text: "Nomination Error" },
          { key: "Contract", text: "Contract Error" }
        ],
        data: []
         })
      this.getView().setModel(oModel, "JasonModel");

      // Default load
      this._loadConfig("Nomination");
    },

    onErrorTypeChange: function(oEvent) {
      let key = oEvent.getParameter("selectedItem").getKey();
      this._loadConfig(key);
    },

    _loadConfig: function(type) {
      let cfg = this._config[type];
      console.log("Binding path:", cfg.entitySet);
      let view = this.getView();

      // Build dynamic columns
      let oTable = view.byId("dynamicTable");
      oTable.removeAllColumns();
      cfg.columns.forEach(field => {
        oTable.addColumn(new Column({ header: new Text({ text: field }) }));
      });

      // Build dynamic filters
      let oFilterBar = view.byId("filterBar");
      oFilterBar.removeAllContent();
      cfg.filters.forEach(field => {
        oFilterBar.addContent(new Label({ text: field }));
        oFilterBar.addContent(new Input({ placeholder: "Enter " + field }));
      });
      oFilterBar.addContent(new ToolbarSpacer());
      oFilterBar.addContent(new Button({ text: "Search" }));

      // Bind data (CAP OData)
      let oModel = this.getOwnerComponent().getModel(); // OData V4 model
      oTable.bindItems({
        path: cfg.entitySet,
        template: new sap.m.ColumnListItem({
          cells: cfg.columns.map(c => new Text({ text: "{" + c + "}" }))
        })
      });
    }
  });
});
