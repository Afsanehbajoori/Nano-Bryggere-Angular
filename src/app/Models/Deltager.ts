import { Bruger } from "./Bruger";
import { Events } from "./Events";

export class Deltager{
  public id: number;
  public brugerId: number;
  public eventId: number;
  public bruger : Bruger;
  public events: Events;
  public erDeltagene : boolean;
}
