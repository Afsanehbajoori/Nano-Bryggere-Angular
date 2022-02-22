import { Bruger } from "./Bruger";
import { Kontaktoplysninger } from "./Kontaktoplysninger";

export class Archive{

  public id: number;
  public brugerId:number;
  public bruger:Bruger;
  public kontaktolysningerId:number;
  public kontaktolysninger:Kontaktoplysninger;
  public oprettet :Date;

}
