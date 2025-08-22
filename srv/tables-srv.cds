using { usib.app.dan as demo } from '../db/tables';

service CatalogService {
  entity Nominations as projection on demo.Nomination;
  entity Contracts   as projection on demo.Contract;
}
