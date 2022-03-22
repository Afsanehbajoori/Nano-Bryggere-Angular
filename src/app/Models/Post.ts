import { User } from "./User";
import { Forum } from "./Forum";

export class Post{
  public id:number;
  public userId:number;
  public user: User;
  public title:string;
  public content:string;
  public createDate:Date;
  public answeringId:number;
  public answer: Post;
  public forumId:number;
  public forum:Forum;
}
