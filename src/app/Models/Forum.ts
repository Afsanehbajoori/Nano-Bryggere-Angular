import { Post } from "./Post";
import { Tags } from "./Tags";

export class Forum

{
  public id:number;
  public titel:string;
  public beskrivelse:string;
  public oprettet : Date;
  public tags: Tags;
  public post:Post;
  public forumBilled: File;
}
