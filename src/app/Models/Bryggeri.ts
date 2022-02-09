import { Kontaktolysninger } from "./Kontaktoplysninger";
import { Samarbejde } from "./Samarbejde";

export class Bryggeri{

  public Id: number;
  public navn: string;
  public kontaktoplysningerId: number;
  public kontaktolysninger : Kontaktolysninger;
  public beskrivelse: string;
  public logo: string;
  public samarbejde: Samarbejde;

}
