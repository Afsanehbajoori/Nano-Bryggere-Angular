import { Bryggeri } from "./Bryggeri";
import { Tags } from "./Tags";

export class Øl {

  public Id: number;
  public land: string;
  public bryggeriId:number;
  public bryggeri: Bryggeri;
  public navn : string;
  public type:string;
  public procent:number;
  public smag:string;
  public beskrivelse:string;
  public bryggeprocess:string;
  public etiket:string;
  public årgang: Date;
  public antal:number;
  public tags: Tags;

}
