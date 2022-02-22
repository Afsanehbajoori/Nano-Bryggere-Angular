import { Kontaktoplysninger } from "./Kontaktoplysninger";
import { Samarbejde } from "./Samarbejde";

export class Bryggeri{

  public id: number;
  public navn: string;
  public kontaktoplysningerId: number;
  public kontaktolysninger : Kontaktoplysninger;
  public beskrivelse: string;
  public logo: string;
  public samarbejde: Samarbejde;

}
