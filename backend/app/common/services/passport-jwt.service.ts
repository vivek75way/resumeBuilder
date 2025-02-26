import bcrypt from "bcrypt";
import { type Request } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { type IUser } from "../../user/user.dto";
import * as userService from "../../user/user.service";

const isValidPassword = async (enteredPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export const initPassport = (): void => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_ACCESS_SECRET ?? "", // Make sure this is set
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (payload: { id: string }, done) => {
        try {
          // Fetch user details from DB based on the token payload
          const user = await userService.getUserById(payload.id);
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
