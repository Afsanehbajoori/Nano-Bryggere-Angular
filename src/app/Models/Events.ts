import { Bruger } from './Bruger';
import { Kontaktolysninger } from "./Kontaktoplysninger";
import { Tags } from "./Tags";

export class Events
{
  public Id : number;
  public Titel: string;
  public Beskrivelse:string;
  public StartDato: Date;
  public SlutDato: Date;
  public Lokation:string;
  public Tags:Tags;
  public Deltagere : Bruger;

}
