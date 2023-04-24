import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import * as saltUtil from "../../src/utils/saltUtil.js";

export default class AuthFactory {
  private _name = faker.name.firstName();
  private _cpf = faker.random.numeric(11);
  private _email = faker.internet.email();
  private _password = faker.internet.password();
  private _encryptedPassword = null;

  public getSignUpInput() {
    return {
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      password: this._password,
    };
  }

  public getSignInInput() {
    return {
      email: this._email,
      password: this._password,
    };
  }

  public encryptPassword(password: string){
    this._encryptedPassword = bcrypt.hashSync(password, saltUtil.bcrypt);
    return this._encryptedPassword;
  }

  get password(){
    return this._password;
  }

  get encryptedPassword(){
    return this._encryptedPassword;
  }
}
