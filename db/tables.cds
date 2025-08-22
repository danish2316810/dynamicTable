namespace usib.app.dan;



entity Nomination {
  key ID : String;
  NominationId : String;
  StartDate   : Date;
  EndDate     : Date;
}

entity Contract {
  key ID : String;
  ContractId : String;
  Supplier   : String;
}
