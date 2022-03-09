import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Samarbejde{
  public id: number;
  public ølId:number;
  public øl: Øl;
  public bryggeriId: number;
  public bryggeri : Bryggeri;
  public titel:string;
  public olBilled : string;
}