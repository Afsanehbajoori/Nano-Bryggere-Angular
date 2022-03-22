import { User } from "./User";
import { Events } from "./Events";

export class Participation{
  public id: number;
  public userId: number;
  public eventsId: number;
  public user : User;
  public events: Events;
  public isParticipating : boolean;
}
