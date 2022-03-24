import { Byte } from "@angular/compiler/src/util";
import { ContactInformation } from "./ContactInformation";
import { Role } from "./Role";
import { Participation } from './Participation';

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
  public certificate: Byte;
  public certificatePicture: string;
}
