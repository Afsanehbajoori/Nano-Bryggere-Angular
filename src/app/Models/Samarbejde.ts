import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Samarbejde{
  public id: number;
  public olId:number;
  public ol: Øl;
  public bryggeriId1: number;
  public bryggeriId2: number;
  public bryggeri : Bryggeri;
  public titel:string;
  public olBilled : string;
}