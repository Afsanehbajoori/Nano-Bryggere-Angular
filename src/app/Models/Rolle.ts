export enum RolleNavn
{
  AnonymBruger = 0,
  Bruger = 100,
  Moderator = 200,
  Administrator = 300
}



export class Rolle
{
  public Id : number;
  public level:number;
  public rolleNavn : RolleNavn;

}
