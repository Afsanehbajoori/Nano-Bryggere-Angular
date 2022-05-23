import { Bruger } from "./Bruger";

export class Rapport{
  public id : number;
  public brugerId: number
  public anklagetBrugerId: Number
  public bruger: Bruger
  public titel: string;
  public besked: string;
  public type: string;
  public godtaget: boolean;
}