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

  return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
    onInit: function() {
      // Config for tables + filters
      this._config = {
        Nomination: {
          entitySet: "/Nominations",
          columns: ["ID", "NominationId", "StartDate", "EndDate","Action"],
          filters: ["NominationId", "StartDate", "EndDate"]
        },
        Contract: {
          entitySet: "/Contracts",
          columns: ["ID","ContractId", "Supplier","Action"],
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
      this._currentType = type;
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
        if(field.toLowerCase().includes("date")){
          oFilterBar.addContent(new sap.m.DatePicker({
            placeholder:"Enter " + field,
            change:this._onLiveSearch.bind(this)
          }))
        }else{
          oFilterBar.addContent(new Input({ 
          placeholder: "Enter " + field,
          liveChange: this._onLiveSearch.bind(this)
       }));
        }
        
      });
      oFilterBar.addContent(new ToolbarSpacer());
      oFilterBar.addContent(new Button({ 
        text: "Search"
        // press: this._onSearch.bind(this) 
      }));

      // Bind data (CAP OData)
      let oModel = this.getOwnerComponent().getModel(); // OData V4 model
      let that=this;
      oTable.bindItems({
            path: cfg.entitySet,
            template: new sap.m.ColumnListItem({
              cells: cfg.columns.map(c => {
                if (c === "Action") {
                  return new sap.m.Button({
                    text: "Reprocess",
                    type: "Emphasized",
                    press: that._onReprocess
                  }).bindProperty("visible", {
                    path: "EnableReprocessing",
                    formatter: function (bValue) {
                      return bValue === true;
                    }
                  });
                } else {
                  return new Text({ text: "{" + c + "}" });
                }
              })
            })
          });

    },

    
    _onReprocess:function(){
        MessageBox.show("i am triggerd")
    },
    _onLiveSearch: function() {
  let view = this.getView();
  let oTable = view.byId("dynamicTable");
  let oFilterBar = view.byId("filterBar");

  let aFilters = [];

  oFilterBar.getContent().forEach(ctrl => {
    if (ctrl.isA("sap.m.Input")) {
      let sValue = ctrl.getValue();
      let sPath = ctrl.getPlaceholder().replace("Enter ", "");
      if (sValue) {
        aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.Contains, sValue));
      }
    }else if (ctrl.isA("sap.m.DatePicker")) {
      let oDate = ctrl.getDateValue(); // <-- real JS Date object
  let sPath = ctrl.getPlaceholder().replace("Enter ", "");
  if (oDate) {
    if (sPath === "StartDate") {
      let sISODate = oDate.toISOString().split("T")[0];
      aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.GE, sISODate));
    } else if (sPath === "EndDate") {
      let sISODate = oDate.toISOString().split("T")[0];
      aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.LE, sISODate));
    }
  }
    }
  });

  oTable.getBinding("items").filter(aFilters);
},
 onLineItemClick:function(oEvent){
      let oObject = oEvent.getParameter("listItem").getBindingContext().getObject();
     let type = this._currentType;
      
      // let object1=oEvent.getSource()._aSelectedPaths
      // let oObject=oEvent.getParameter("listItem").getBindingContextPath().split("'")[1]
      // let type = this._currentType;
      let oRouter=this.getOwnerComponent().getRouter()
             oRouter.navTo("RouteDetailView",{
                id:oObject.ID,
                type:type
                })
      
      
      },

  //   _onSearch:function(){
  //      let view = this.getView();
  // let oTable = view.byId("dynamicTable");
  // let oFilterBar = view.byId("filterBar");

  // let aFilters = [];

  // oFilterBar.getContent().forEach(ctrl => {
  //   if (ctrl.isA("sap.m.Input")) {
  //     let sValue = ctrl.getValue();
  //     let sPath = ctrl.getPlaceholder().replace("Enter ", ""); // match filter name
  //     if (sValue) {
  //       aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.Contains, sValue));
  //     }
  //   }
  // });

  // oTable.getBinding("items").filter(aFilters);
  //   }

  });
});
