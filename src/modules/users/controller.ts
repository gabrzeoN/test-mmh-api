import { Response, Request } from "express";

import * as useCase from "./useCase.js";

export async function listAllUsers(req: Request, res: Response) {
  const result = await useCase.listAllUsers();
  return res.status(200).send(result);
}
