import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

interface Payload {
  email: string;
}

const generateToken = async (payload: Payload, secret = secretKey) => {
  try {
    const token = await jwt.sign(payload, secret!, { expiresIn: "1d" });
    return token;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (token: string, secret = secretKey) => {
  const decoded = await jwt.verify(token, secret!);
  return decoded;
};

const authWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
      throw new Error("No token");
    }
    const decoded = (await verifyToken(token)) as JwtPayload;
    if (!decoded) {
      throw new Error("You are not authorized to do this");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: err,
    });
  }
  return next();
};

export { generateToken, authWallet };
