import { Brewery } from "./Brewery";
import { Cooperation } from "./Cooperation";
import { Tags } from "./Tags";

export class Beer {
  public id: number;
  public country: string;
  public breweryId:number;
  public brewery: Brewery;
  public name : string;
  public type:string;
  public percentage:number;
  public taste:string;
  public description:string;
  public brewingprocess:string;
  public label:string;
  public vintage: Date;
  public quantity:number;
  public bottleQuantity:number;
  public barrelQuantity:number;
  public bottleResevationQuantity: number;
  public cooperationId: number;
  public cooperation: Cooperation;
  public tags: Tags;
}
