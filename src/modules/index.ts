import { Router } from "express";

import authRouter from "./auth/router.js";
import userRouter from "./users/router.js";

const router = Router();

router
  .use(authRouter)
  .use(userRouter);
  
export default router;
