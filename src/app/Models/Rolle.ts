export enum RolleNavn{
  AnonymBruger = 0,
  Bruger = 100,
  Moderator = 650,
  Administrator = 1000
}

export class Rolle{
  public id : number;
  public level:number;
  public rolleNavn : RolleNavn;
}