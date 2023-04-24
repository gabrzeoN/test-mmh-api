import { Response, Request } from "express";
import * as model from "./model.js";
import useCase from "./useCase.js";

export async function signUpUser(req: Request, res: Response) {
  const body: model.SignUpModel = req.body;
  const result = await useCase.signUpUser(body);
  return res.status(201).send(result);
}

export async function signInUser(req: Request, res: Response) {
  const body: model.SignInModel = req.body;
  const result = await useCase.signInUser(body);
  return res.status(200).send(result);
}

export async function resetUserPassword(req: Request, res: Response) {
  // const tokenTemp: string = req.params.tokenTemp;
  // const body: model.ResetPasswordModel = req.body;
  // await useCase.resetUserPassword(body, tokenTemp);
  // return res.sendStatus(200);
}

export async function forgotUserPassword(req: Request, res: Response) {
  // const body: model.ForgotPasswordModel = req.body;
  // await useCase.forgotUserPassword(body);
  // return res.sendStatus(200);
}

export async function signUpProfessional(req: Request, res: Response) {
  const body: model.SignUpModel = req.body;
  const result = await useCase.signUpProfessional(body);
  return res.status(201).send(result);
}

export async function signInProfessional(req: Request, res: Response) {
  const body: model.SignInModel = req.body;
  const result = await useCase.signInProfessional(body);
  return res.status(200).send(result);
}

export async function resetProfessionalPassword(req: Request, res: Response) {
  // const tokenTemp: string = req.params.tokenTemp;
  // const body: model.ResetPasswordModel = req.body;
  // await useCase.resetProfessionalPassword(body, tokenTemp);
  // return res.sendStatus(200);
}

export async function forgotProfessionalPassword(req: Request, res: Response) {
  // const body: model.ForgotPasswordModel = req.body;
  // await useCase.forgotProfessionalPassword(body);
  // return res.sendStatus(200);
}
