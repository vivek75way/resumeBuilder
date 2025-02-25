import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "../../user/user.service";
import { type Request } from "express";
import { type IUser } from "../../user/user.dto";

const isValidPassword = async (value: string, password?: string) => {
  if (!password) return false; // Prevents passing undefined to bcrypt
  return await bcrypt.compare(value, password);
};


export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: { user: Request["user"] }, done) => {
        try {
          done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );

  // User login strategy
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (!user) {
            return done(createError(401, "User not found!"), false);
          }
  
          if (!user.password) {
            return done(createError(500, "User password is missing"), false);
          }
  
          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            return done(createError(401, "Invalid email or password"), false);
          }
  
          const { password: _p, ...result } = user;
          return done(null, result, { message: "Logged in Successfully" });
        } catch (error: any) {
          return done(createError(500, error.message));
        }
      },
    ),
  );
  
}; 
export const createUserTokens = (user: Omit<IUser, "password">) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const token = jwt.sign(user, jwtSecret);
  return { accessToken: token, refreshToken: "" };
};

export const decodeToken = (token: string) => {
  const decode = jwt.decode(token);
  return decode as IUser;
};
