export class LoginUser {
  constructor(public id: number,
              public email: string,
              public phoneNumber: string,
              public roles: string[]) {
  }
}
