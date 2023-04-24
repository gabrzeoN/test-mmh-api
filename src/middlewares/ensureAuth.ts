import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as saltUtil from "../utils/saltUtil.js";
import * as err from "../utils/errorUtil.js";

export default function ensureAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = await tokenMustExist(req);
    jwt.verify(token, saltUtil.jwt, async (error, result: { id: string, userType: string, status?: string, businessId?: string }) => {
      try {
        if (error) res.status(401).send(err.unauthorizedError("Token expired!"));
        if (result) {
          if (result.userType === "user") {
            res.locals.userId = result.id || "unique_id";
            next();
          } else {
            res.status(401).send(err.unauthorizedError("Only users is allowed to access this route!"));
          }
        }
      } catch (error) {
        res.status(err.errorTypeToStatusCode(error.type)).send(error);
      }
    });
  };
}

async function tokenMustExist(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) throw err.unauthorizedError("Token not found!");
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) throw err.unauthorizedError("Token not found!");
  return token;
}
