import { Bryggeri } from "./Bryggeri";
import { Bruger } from "./Bruger";

export class KontaktOplysninger {
  public id: number;
  public enavn : string;
  public fnavn: string;
  public adresseLinje1: string;
  public adresseLinje2: string;
  public postNr: number;
  public by: string;
  public email: string;
  public telefonNr: string;
  public brugerId: number;
  public bruger: Bruger;
}
