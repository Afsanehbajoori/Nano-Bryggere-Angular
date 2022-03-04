import { Byte } from "@angular/compiler/src/util";
import { Events } from "./Events";
import { Kontaktoplysninger } from "./Kontaktoplysninger";
import { Rolle } from "./Rolle";

export class Bruger {
  public id: number;
  public brugernavn: string;
  public pw : string;
  public rolleId:number;
  public rolle: Rolle;
  public kontaktoplysningerId: number;
  public kontaktoplysninger: Kontaktoplysninger;
  public events: Events;
  public certifikat: Byte;
  public certifikatImg: string;
}
