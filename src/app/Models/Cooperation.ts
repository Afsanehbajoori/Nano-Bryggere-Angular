import { Brewery } from "./Brewery";
import { Beer } from "./Beer";

export class Cooperation{
  public id: number;
  public breweryId1: number
  public breweryId2: number;
  public brewery: Brewery;
  public beerId:number;
  public beer: Beer;
  public title:string;
  public beerPicture : string;
}