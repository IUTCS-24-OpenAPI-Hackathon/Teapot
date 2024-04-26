import { Express, NextFunction, Request, Response } from "express";
import { getUserRepository } from "../data/entity/user.entity";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { reviewSchema } from "../data/entity/reviews.entity";

const setJwtCookie = (res: Response, id: number, expiry: string) => {
  const token = jwt.sign({ userId: id }, process.env.ACCESS_SECRET ?? "", {
    expiresIn: expiry,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 3600 * 1000,
  });
};

const clearJwtCookie = (res: Response) => {
  res.clearCookie("jwt");
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ error: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.ACCESS_SECRET ?? "");
    next();
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const registerUserRoutes = (app: Express) => {
  app.post("/api/signup", async (req, res) => {
    const inputSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const { name, email, password } = inputSchema.parse(req.body);
      const userRepo = getUserRepository();

      const userExists = await userRepo.findOne({
        where: {
          email: email,
        },
      });
      if (userExists) {
        res.status(401).json({
          error: "User with that email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const savedUser = await userRepo.insert({
        name,
        email,
        password: hashedPassword,
      });

      const user_id = savedUser.identifiers[0].id;

      setJwtCookie(res, user_id, "30d");

      res.status(201).json({
        user_id,
      });
    } catch (e) {
      res.status(400).json({
        error: e,
      });
    }
  });

  app.post("/api/loginUser", async (req, res) => {
    const inputSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    try {
      const { email, password } = inputSchema.parse(req.body);
      const userRepo = getUserRepository();
      const user = await userRepo.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(400).json({
          error: "User not found",
        });
        return;
      }
      const passwordMatched = await bcrypt.compare(password, user.password);

      if (user && passwordMatched) {
        setJwtCookie(res, user.id, "30d");
        res.json(user);
      } else {
        res.status(400).json({
          error: "Password did not match",
        });
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({
        error: e,
      });
    }
  });

  app.post("/api/logoutUser", (req, res) => {
    clearJwtCookie(res);
    res.status(200).json({
      msg: "logged out successfully",
    });
  });

  app.post("/api/addReview", verifyToken, (req, res) => {
    const inputSchema = z.object({
      node_id: z.string(),
    });
  });
};
