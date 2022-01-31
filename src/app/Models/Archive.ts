import { Bruger } from "./Bruger";
import { Kontaktolysninger } from "./Kontaktoplysninger";

export class Archive{

  public Id: number;
  public BrugerId:number;
  public Bruger:Bruger;
  public KontaktolysningerId:number;
  public Kontaktolysninger:Kontaktolysninger;
  public Oprettet :Date;

}
