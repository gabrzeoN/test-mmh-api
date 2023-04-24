
import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import AuthFactory from "../factories/AuthFactory.js";
import authRepository from "../../src/modules/auth/repository.js";
import useCase from "../../src/modules/auth/useCase.js";
import * as err from "../../src/utils/errorUtil.js";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("authUseCase/mustNotExistByEmail", () => {
  it("should fail", () => {
    const user = new AuthFactory().getSignUpInput();
    jest.spyOn(authRepository, "getByEmail").mockImplementationOnce(():any => user);
    const promise = useCase.mustNotExistByEmail("users", user.email);
    expect(promise).rejects.toStrictEqual(0);
  });
  it("should throw exist user by email", () => {
    const user = new AuthFactory().getSignUpInput();
    jest.spyOn(authRepository, "getByEmail").mockImplementationOnce(():any => user);
    const promise = useCase.mustNotExistByEmail("users", user.email);
    expect(promise).rejects.toStrictEqual(err.conflictError("This email is already registered!"));
  });
  it("should not exist user by email", () => {
    const user = new AuthFactory().getSignUpInput();
    jest.spyOn(authRepository, "getByEmail").mockImplementationOnce(():any => null);
    const promise = useCase.mustNotExistByEmail("users", user.email);
    expect(promise).resolves.toBe(null);
  });
});

describe("authUseCase/mustExistByEmail", () => {
  it("should throw user does not exist by email", () => {
    const user = new AuthFactory().getSignUpInput();
    jest.spyOn(authRepository, "getByEmail").mockImplementationOnce(():any => null);
    const promise = useCase.mustExistByEmail("users", user.email);
    expect(promise).rejects.toStrictEqual(err.conflictError("Incorrect email or password!"));
  });
  it("should exist user by email", () => {
    const user = new AuthFactory().getSignUpInput();
    jest.spyOn(authRepository, "getByEmail").mockImplementationOnce(():any => user);
    const promise = useCase.mustExistByEmail("users", user.email);
    expect(promise).resolves.toBe(user);
  });
});

describe("authUseCase/encryptPassword", () => {
  it("should encrypt password by bcrypt lib", () => {
    const user = new AuthFactory();
    const result = useCase.encryptPassword(user.password);
    const encryptedByBcrypt = bcrypt.compareSync(user.password, result);
    expect(result).not.toEqual(user.password);
    expect(encryptedByBcrypt).toEqual(true);
  });
});

describe("authUseCase/emailPasswordMustMatch", () => {
  it("should throw password cannot be decrypted by bcrypt", () => {
    const user = new AuthFactory();
    user.encryptPassword(user.password);
    const result = useCase.emailPasswordMustMatch(faker.internet.password(), user.encryptedPassword);
    expect(result).rejects.toStrictEqual(err.unauthorizedError("Incorrect email or password!"));
  });
  it("should match password and encrypted password by bcrypt", () => {
    const user = new AuthFactory();
    user.encryptPassword(user.password);
    const result = useCase.emailPasswordMustMatch(user.password, user.encryptedPassword);
    expect(result).resolves.toBe(0);
  });
});
