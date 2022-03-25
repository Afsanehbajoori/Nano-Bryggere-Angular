import { Byte } from "@angular/compiler/src/util";
import { ContactInformation } from "./ContactInformation";
import { Role } from "./Role";
import { Participation } from './Participation';
import { Certificate } from "crypto";

export class User {
  public id: number;
  public username: string;
  public pw : string;
  public roleId:number;
  public role: Role;
  public contactInformationId: number;
  public contactInformation: ContactInformation;
  //public events: Events;
  public participation: Participation;
  public certificateLevel: Byte;
  public certificatePicture: string;
}
