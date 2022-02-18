export enum RolleNavn
{
  AnonymBruger = 0,
  Bruger = 100,
  Moderator = 200,
  Administrator = 300
}



export class Rolle
{
  public id : number;
  public level:number;
  public rolleNavn : RolleNavn;

}
