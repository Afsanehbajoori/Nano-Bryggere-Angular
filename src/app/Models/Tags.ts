import { Events } from "./Events";
import { Forum } from "./Forum";
import { Beer } from "./Beer";

export class Tags{
  public id: number;
  public name: string;
  public events: Events;
  public forum: Forum;
  public beer : Beer;
}
