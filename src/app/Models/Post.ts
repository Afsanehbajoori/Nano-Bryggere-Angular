import { Bruger } from "./Bruger";
import { Forum } from "./Forum";


export class Post{
  public id:number;
  public brugerId:number;
  public bruger: Bruger;
  public titel:string;
  public indhold:string;
  public oprettet:Date;
  public postId:number;
  public svarer : Post;
  public forumId:number;
  public forum:Forum;
}
