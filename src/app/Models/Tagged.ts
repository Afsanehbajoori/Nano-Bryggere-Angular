import { Events } from "./Events";
import { Forum } from "./Forum";
import { Tags } from "./Tags";
import { Øl } from "./Øl";

export class Tagged{
    public id: number;
    public tagId: number;
    public tags: Tags;
    public forumId: number;
    public forum: Forum;
    public eventId: number;
    public events: Events;
    public olId: number;
    public ol: Øl;
  }