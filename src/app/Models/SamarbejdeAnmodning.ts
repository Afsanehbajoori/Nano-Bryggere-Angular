import { Bryggeri } from "./Bryggeri";

export class SamarbejdeAnmodning{
  public id: number;
  public bryggeriId1: number;
  public bryggeriId2: number;
  public titel:string;
  public samarbejdeBilled: string;
  public bryggeri: Bryggeri;
}