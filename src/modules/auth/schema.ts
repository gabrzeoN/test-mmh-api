import joi from "joi";
import * as model from "./model.js";

export const resetPasswordJoi = joi.object<model.ResetPasswordModel>({
  password: joi.string().pattern(new RegExp(model.atLeast_1Lower_1Upper_1Number_Min8Digits)).required(),
});

export const forgotPasswordJoi = joi.object<model.ForgotPasswordModel>({
  email: joi.string().trim().email().required()
});

export const signinJoi = joi.object<model.SignInModel>({
  email: joi.string().trim().email().required(),
  password: joi.string().required(),
});

export const signupJoi = joi.object<model.SignUpModel>({
  name: joi.string().trim().max(model.maxSizeName).required(),
  email: joi.string().trim().email().required(),
  cpf: joi.string().trim().pattern(new RegExp("^[0-9]{11}$")).required(),
  password: joi.string().pattern(new RegExp(model.atLeast_1Lower_1Upper_1Number_Min8Digits)).required(),
});
