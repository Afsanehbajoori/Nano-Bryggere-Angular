import { Bryggeri } from "./Bryggeri";
import { Tags } from "./Tags";

export class Øl {

  public id: number;
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
  public argang: Date;
  public antal:number;
  // public flaskeAntal:number;
  // public tondeAntal:number;
  // public flaskeResAntal: number;
  public tags: Tags;
  public olImg: File;
}
