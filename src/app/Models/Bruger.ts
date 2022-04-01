import { Byte } from "@angular/compiler/src/util";
import { KontaktOplysninger } from "./KontaktOplysninger";
import { Rolle } from "./Rolle";
import { Deltager } from './Deltager';

export enum CertifikatStatus{
  IkkeSendt = 1,
  VentTilGodkendt = 2,
  Godkendt = 3
}

export class Bruger {
  public id: number;
  public brugernavn: string;
  public pw : string;
  public rolleId:number;
  public rolle: Rolle;
  public kontaktOplysningerId: number;
  public kontaktOplysninger: KontaktOplysninger;
  //public events: Events;
  public deltager: Deltager;
  public certifikatStatus: CertifikatStatus;
  public certifikatBilled: string;
}
