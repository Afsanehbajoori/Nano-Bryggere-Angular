import { Bruger } from "./Bruger";
import { Forum } from "./Forum";


export class Post
{
  public Id:number;
  public BrugerId:number;
  public Bruger: Bruger;
  public Titel:string;
  public Indhold:string;
  public Oprettet:Date;
  public PostId:number;
  public Svarer : Post;
  public ForumId:number;
  public Forum:Forum;
}
