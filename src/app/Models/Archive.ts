import { Bruger } from "./Bruger";
import { Kontaktolysninger } from "./Kontaktoplysninger";

export class Archive{

  public id: number;
  public brugerId:number;
  public bruger:Bruger;
  public kontaktolysningerId:number;
  public kontaktolysninger:Kontaktolysninger;
  public oprettet :Date;

}
