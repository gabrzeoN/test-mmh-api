import { Router } from "express";
import * as controller from "./controller.js";

const userRouter = Router();
const main = "/users";

userRouter
  .get( main + "/", controller.listAllUsers);

export default userRouter;
