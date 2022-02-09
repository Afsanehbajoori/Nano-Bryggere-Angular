import { Post } from "./Post";
import { Tags } from "./Tags";

export class Forum

{
  public Id:number;
  public titel:string;
  public beskrivele:string;
  public oprettet : Date;
  public tags: Tags;
  public post:Post;
}
