import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Samarbejde{
  public id: number;
  public ølId:number;
  public øl: Øl;
  public titel:string;
  public bryggeri : Bryggeri;
  // public olBilled : string;
}
