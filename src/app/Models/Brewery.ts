import { ContactInformation } from "./ContactInformation";
import { Cooperation } from "./Cooperation";

export class Brewery{
  public id: number;
  public name: string;
  public contactInformationId: number;
  public contactInformation : ContactInformation;
  public description: string;
  public logo: string;
  public cooperationId: number;
  public cooperation: Cooperation;
}
