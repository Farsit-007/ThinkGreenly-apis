import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { httpStatus } from "../utils/httpStatus";
import { verifyToken } from "../utils/jwtHalper";
import config from "../config";
import { Secret } from "jsonwebtoken";

export const auth = (...role: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized");
        }
        const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret);
        req.user = verifiedUser
        if (role.length && !role.includes(verifiedUser.role)) {
          throw new AppError(httpStatus.FORBIDDEN,"You are not authorized");
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };