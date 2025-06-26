import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: number;
  email: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const bearer = authHeader && authHeader.split(" ")[1];

  if (!bearer) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(
    bearer,
    process.env.TOKEN!,
    function (err: jwt.VerifyErrors | null, decoded: DecodedToken | undefined) {
      if (err) {
        return res.status(403).json({ message: "Token inválido" });
      }
      req.user = decoded;
      next();
    }
  );
};
