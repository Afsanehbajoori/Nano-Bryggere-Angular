import { Post } from "./Post";
import { Tags } from "./Tags";

export class Forum{
  public id:number;
  public title:string;
  public description:string;
  public createDate: Date;
  public forumPicture: string;
  public tags: Tags;
  public post:Post;
 
  
}
