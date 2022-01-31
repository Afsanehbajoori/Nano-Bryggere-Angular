import { Events } from "./Events";
import { Kontaktolysninger } from "./Kontaktoplysninger";
import { Rolle } from "./Rolle";

export class Bruger {

  public Id: number;
  public Brugernavn: string;
  public Pw : string;
  public RolleId:number;
  public Rolle: Rolle;
  public KontaktoplysningerId: number;
  public Kontaktoplysninger: Kontaktolysninger;
  public Events: Events;



}
