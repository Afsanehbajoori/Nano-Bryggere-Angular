import { User } from "./User";
import { ContactInformation } from "./ContactInformation";

export class Archive{
  public id: number;
  public userId:number;
  public user:User;
  public contactInformationId:number;
  public contactInformation:ContactInformation;
  public createDate :Date;
}
