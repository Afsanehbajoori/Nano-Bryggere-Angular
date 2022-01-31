import { Bryggeri } from "./Bryggeri";
import { Tags } from "./Tags";

export class Øl {

  public Id: number;
  public Land: string;
  public BryggeriId:number;
  public Bryggeri: Bryggeri;
  public Nave : string;
  public Type:string;
  public Procent:number;
  public smag:string;
  public Beskrivelse:string;
  public Bryggeprocess:string;
  public Etiket:string;
  public Årgang: Date;
  public Antal:number;
  public Tags: Tags;

}
