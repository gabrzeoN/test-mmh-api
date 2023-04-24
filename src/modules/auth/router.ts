import { Router } from "express";
import { resetPasswordJoi, forgotPasswordJoi, signinJoi, signupJoi } from "./schema.js";
import * as controller from "./controller.js";
import validSchema from "../../middlewares/validSchemaMiddleware.js";

const authRouter = Router();
const main = "/auth";

authRouter
  // Users
  .post( main + "/users/sign-up", validSchema(signupJoi), controller.signUpUser)
  .post( main + "/users/sign-in", validSchema(signinJoi), controller.signInUser)
  .patch(main + "/users/:tokenTemp/reset-password", validSchema(resetPasswordJoi), controller.resetUserPassword)
  .post( main + "/users/forgot-password", validSchema(forgotPasswordJoi), controller.forgotUserPassword)

  // Professionals
  .post( main + "/professionals/sign-up", validSchema(signupJoi), controller.signUpProfessional)
  .post( main + "/professionals/sign-in", validSchema(signinJoi), controller.signInProfessional)
  .patch(main + "/professionals/:tokenTemp/reset-password", validSchema(resetPasswordJoi), controller.resetProfessionalPassword)
  .post( main + "/professionals/forgot-password", validSchema(forgotPasswordJoi), controller.forgotProfessionalPassword);

export default authRouter;
