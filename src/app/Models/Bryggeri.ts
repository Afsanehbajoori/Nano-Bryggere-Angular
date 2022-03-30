import { KontaktOplysninger } from "./KontaktOplysninger";
import { Samarbejde } from "./Samarbejde";

export class Bryggeri{
  public id: number;
  public navn: string;
  public kontaktOplysningerId: number;
  public kontaktOplysninger: KontaktOplysninger;
  public beskrivelse: string;
  public bryggeriLogo: string;
  public samarbejdeId: number;
  public samarbejde: Samarbejde;
}
