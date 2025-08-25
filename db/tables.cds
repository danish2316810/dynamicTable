namespace usib.app.dan;



entity Nomination {
  key ID : String;
  NominationId : String;
  StartDate   : Date;
  EndDate     : Date;
  EnableReprocessing:Boolean;
}

entity Contract {
  key ID : String;
  ContractId : String;
  Supplier   : String;
  EnableReprocessing:Boolean;
}
