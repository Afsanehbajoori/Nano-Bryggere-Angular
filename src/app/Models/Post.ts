import { Bruger } from "./Bruger";
import { Forum } from "./Forum";

export class Post{
  public id: number;
  public brugerId: number;
  public bruger: Bruger;
  public title: string;
  public indhold: string;
  public oprettelsesDato: Date;
  public svarId: number;
  public svar: Post;
  public forumId: number;
  public forum: Forum;
}
