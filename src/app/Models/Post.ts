import { Forum } from "./Forum";
import { Kontaktolysninger } from "./Kontaktoplysninger";

export class Post
{
  public Id:number;
  public KontaktolysningerId:number;
  public Kontaktolysninger:Kontaktolysninger;
  public Titel:string;
  public Indhold:string;
  public Oprettet:Date;
  public PostId:number;
  public Svarer : Post;
  public ForumId:number;
  public Forum:Forum;
}
