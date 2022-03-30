import { Deltager } from "./Deltager";
import { Tags } from "./Tags";

export class Events{
  public id : number;
  public titel: string;
  public beskrivelse:string;
  public startDato: Date;
  public slutDato: Date;
  public lokation:string;
  public eventBilled:string;
  public tags:Tags;
  public deltagelse: Deltager;
  //public deltagere : Bruger;

}
