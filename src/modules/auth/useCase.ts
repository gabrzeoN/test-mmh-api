import { Users, Professionals } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import repository from "./repository.js";
import * as saltUtil from "../../utils/saltUtil.js";
import * as err from "../../utils/errorUtil.js";
import * as model from "./model.js";
import email from "./helpers.js";

async function mustNotExistByEmail(table: string, email: string) {
  const user = await repository.getByEmail(table, email);
  if (user) {
    throw err.conflictError("This email is already registered!");
  }
  return user;
}

async function mustExistByEmail(table: string, email: string) {
  const user = await repository.getByEmail(table, email);
  if (!user) {
    throw err.conflictError("Incorrect email or password!");
  }
  return user;
}

function encryptPassword(password: string) {
  const encryptedPassword = bcrypt.hashSync(password, saltUtil.bcrypt);
  return encryptedPassword;
}

async function emailPasswordMustMatch(inputPassword: string, userPassword: string) {
  const correctPassword = bcrypt.compareSync(inputPassword, userPassword);
  if (!correctPassword) {
    throw err.unauthorizedError("Incorrect email or password!");
  }
  return 0;
}

function genJwtPayload(userType: string, user: Users | Professionals){
  delete user.password;
  delete user.tokenTemp;
  const jwtPayload = {...user, userType};
  return jwtPayload;
}

function generateJwtToken(payload: any) {
  const salt = saltUtil.jwt;
  const config = {
    expiresIn: saltUtil.timeToJwtExpires
  };
  const token = jwt.sign(payload, salt, config);
  return token;
}

//  ------------------  Routed functions  ----------------------------------------------------

async function signUpUser(newUser: model.SignUpModel) {
  await mustNotExistByEmail("users", newUser.email);
  const encryptedPassword = encryptPassword(newUser.password);
  const tokenTemp = email.sendAccConfirmationEmail(newUser.email, newUser.name);
  await repository.insertSignUp("users", { ...newUser, password: encryptedPassword, tokenTemp });
  const { token } = await signInUser({ email: newUser.email, password: newUser.password });
  return { token };
}

async function signUpProfessional(newProfessional: model.SignUpModel) {
  await mustNotExistByEmail("professionals", newProfessional.email);
  const encryptedPassword = encryptPassword(newProfessional.password);
  const tokenTemp = email.sendAccConfirmationEmail(newProfessional.email, newProfessional.name);
  await repository.insertSignUp("professionals", { ...newProfessional, password: encryptedPassword, tokenTemp });
  const { token } = await signInProfessional({ email: newProfessional.email, password: newProfessional.password });
  return { token };
}

async function signInUser(input: model.SignInModel) {
  const user = await mustExistByEmail("users", input.email);
  await emailPasswordMustMatch(input.password, user.password);
  const jwtPayload = genJwtPayload("user", user);
  const token = generateJwtToken(jwtPayload);
  return { token };
}

async function signInProfessional(input: model.SignInModel) {
  const professional = await mustExistByEmail("professionals", input.email);
  await emailPasswordMustMatch(input.password, professional.password);
  const jwtPayload = genJwtPayload("professional", professional);
  const token = generateJwtToken(jwtPayload);
  return { token };
}

// export async function resetSuperadminPassword(newPassword: model.ResetPasswordModel, tokenTemp: string) {
//   const superadmin = await superadminsUseCase.mustExistByTokenTemp(tokenTemp);
//   const encryptedNewPassword = encryptPassword(newPassword.password);
//   const newTokenTemp = email.sendPasswordResetedSuccessfully(superadmin.email, superadmin.name);
//   await superadminsRepository.updatePasswordAndTokenTempAndConfirmEmailById(superadmin.id, encryptedNewPassword, newTokenTemp);
//   return 0;
// }

// export async function resetAdminPassword(newPassword: model.ResetPasswordModel, tokenTemp: string) {
//   const admin = await adminsUseCase.mustExistByTokenTemp(tokenTemp);
//   const encryptedNewPassword = encryptPassword(newPassword.password);
//   const newTokenTemp = email.sendPasswordResetedSuccessfully(admin.email, admin.name);
//   await adminsRepository.updatePasswordAndTokenTempAndConfirmEmailById(admin.id, encryptedNewPassword, newTokenTemp);
//   return 0;
// }

// export async function forgotSuperadminPassword(forgotPassSuperadmin: model.ForgotPasswordModel) {
//   const superadmin = await superadminsUseCase.mustExistByEmail(forgotPassSuperadmin.email);
//   const newTokenTemp = await email.sendResetYourPassword(superadmin.email, superadmin.name);
//   await superadminsRepository.updateTokenTempById(superadmin.id, newTokenTemp);
//   return 0;
// }

// export async function forgotAdminPassword(forgotPassAdmin: model.ForgotPasswordModel) {
//   const admin = await adminsUseCase.mustExistByEmail(forgotPassAdmin.email);
//   const newTokenTemp = await email.sendResetYourPassword(admin.email, admin.name);
//   await adminsRepository.updateTokenTempById(admin.id, newTokenTemp);
//   return 0;
// }

const useCase = {
  mustNotExistByEmail,
  mustExistByEmail,
  encryptPassword,
  emailPasswordMustMatch,
  genJwtPayload,
  generateJwtToken,

  signUpUser,
  signUpProfessional,
  signInUser,
  signInProfessional

};

export default useCase;
