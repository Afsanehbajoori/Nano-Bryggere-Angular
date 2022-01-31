import { Post } from "./Post";
import { Tags } from "./Tags";

export class Forum

{
  public Id:number;
  public Titel:string;
  public Beskrivele:string;
  public Oprettet : Date;
  public Tags: Tags;
  public Post:Post;
}
