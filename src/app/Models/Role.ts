export enum RoleName{
  AnonymousUser = 0,
  User = 100,
  Moderator = 200,
  Administrator = 300
}

export class Role{
  public id : number;
  public level:number;
  public roleName : RoleName;
}