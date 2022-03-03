import { Bruger } from './Bruger';
// import { Kontaktoplysninger } from "./Kontaktoplysninger";
import { Tags } from "./Tags";

export class Events{
  public id : number;
  public titel: string;
  public beskrivelse:string;
  public startDato: Date;
  public slutDato: Date;
  public lokation:string;
  // public eventBilled:string;
  public tags:Tags;
  public deltagere : Bruger;
}
