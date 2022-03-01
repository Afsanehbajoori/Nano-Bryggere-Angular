import { Kontaktoplysninger } from "./Kontaktoplysninger";
import { Samarbejde } from "./Samarbejde";

export class Bryggeri{

  public id: number;
  public navn: string;
  public kontaktoplysningerId: number;
  public kontaktoplysninger : Kontaktoplysninger;
  public beskrivelse: string;
  public logo: string;
  public billed: File;
  public samarbejde: Samarbejde;

}
