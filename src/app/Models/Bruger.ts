import { Byte } from "@angular/compiler/src/util";
import { Events } from "./Events";
import { Kontaktoplysninger } from "./Kontaktoplysninger";
import { Rolle } from "./Rolle";
import { Deltagere } from './Deltagere';

export class Bruger {
  public id: number;
  public brugernavn: string;
  public pw : string;
  public rolleId:number;
  public rolle: Rolle;
  public kontaktoplysningerId: number;
  public kontaktoplysninger: Kontaktoplysninger;
  //public events: Events;
  public deltagere: Deltagere;
  public certifikat: Byte;
  public certifikatImg: string;
}
