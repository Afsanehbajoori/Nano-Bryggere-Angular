import { Kontaktolysninger } from "./Kontaktoplysninger";
import { Samarbejde } from "./Samarbejde";

export class Bryggeri{

  public BryggeriId: number;
  public Navn: string;
  public KontaktoplysningerId: number;
  public Kontaktolysninger : Kontaktolysninger;
  public Beskrivelse: string;
  public Logo: string;
  public Samarbejde: Samarbejde;

}
