import { Events } from "./Events";
import { Kontaktolysninger } from "./Kontaktoplysninger";
import { Rolle } from "./Rolle";

export class Bruger {

  public Id: number;
  public brugernavn: string;
  public pw : string;
  public rolleId:number;
  public rolle: Rolle;
  public kontaktoplysningerId: number;
  public kontaktoplysninger: Kontaktolysninger;
  public events: Events;



}
