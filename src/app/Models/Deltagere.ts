import { Bruger } from "./Bruger";
import { Events } from "./Events";

export class Deltagere{
  public id: number;
  public brugerId: number;
  public eventsId: number;
  public bruger : Bruger;
  public events: Events;
  public isDeltage : boolean;
}
