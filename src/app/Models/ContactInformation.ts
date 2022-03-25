import { Brewery } from "./Brewery";
import { User } from "./User";

export class ContactInformation {
  public id: number;
  public sname : string;
  public fname: string;
  public addressline1: string;
  public addressline2: string;
  public mailNr: number;
  public city: string;
  public email: string;
  public phoneNr: string;
  public brewery : Brewery;
  public userId: number;
  public user: User;
}
