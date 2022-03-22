import { Participation } from "./Participation";
import { Tags } from "./Tags";

export class Events{
  public id : number;
  public title: string;
  public description:string;
  public startDate: Date;
  public endDate: Date;
  public location:string;
  public eventPicture:string;
  public tags:Tags;
  public participation: Participation;
  //public deltagere : Bruger;

}
