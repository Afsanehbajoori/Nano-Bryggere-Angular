import { Bryggeri } from "./Bryggeri";

export class Kontaktoplysninger {
  public id: number;
  public enavn : string;
  public fnavn: string;
  public addresselinje1: string;
  public addresselinje2: string;
  public postnr: number;
  public by: string;
  public email: string;
  public telefonnr: string;
  public bryggeri : Bryggeri;
}
