import { Bruger } from "./Bruger";
import { KontaktOplysninger } from "./KontaktOplysninger";

export class Arkiv{
  public id: number;
  public brugerId:number;
  public bruger:Bruger;
  public kontaktOplysningerId:number;
  public kontaktOplysninger:KontaktOplysninger;
  public oprettelsesDato :Date;
}
