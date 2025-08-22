sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Label",
  "sap/m/ToolbarSpacer",
  "sap/m/Button"
], function(Controller, Column, Text, Input, Label, ToolbarSpacer, Button) {
  "use strict";

  return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
    onInit: function() {
      // Config for tables + filters
      this._config = {
        Nomination: {
          entitySet: "/Nominations",
          columns: ["NominationId", "StartDate", "EndDate"],
          filters: ["NominationId", "StartDate", "EndDate"]
        },
        Contract: {
          entitySet: "/Contracts",
          columns: ["ContractId", "Supplier"],
          filters: ["ContractId", "Supplier"]
        }
      };

      // Mock error types
      this.getView().setModel(new sap.ui.model.json.JSONModel({
        errorTypes: [
          { key: "Nomination", text: "Nomination Error" },
          { key: "Contract", text: "Contract Error" }
        ],
        data: []
      }));

      // Default load
      this._loadConfig("Nomination");
    },

    onErrorTypeChange: function(oEvent) {
      let key = oEvent.getParameter("selectedItem").getKey();
      this._loadConfig(key);
    },

    _loadConfig: function(type) {
      let cfg = this._config[type];
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
