import { Bryggeri } from "./Bryggeri";
import { Øl } from "./Øl";

export class Samarbejde{

  public Id: number;
  public ØlId:number;
  public Øl: Øl;
  public Titel:string;
  public Bryggeri : Bryggeri;
}
