import { Express, NextFunction, Request, Response } from "express";
import { getUserRepository } from "../data/entity/user.entity";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

import {
  getReviewRepository,
  reviewSchema,
} from "../data/entity/reviews.entity";
import { getMapNodeRepository } from "../data/entity/node.entity";

const setJwtCookie = (res: Response, id: number, expiry: string) => {
  const token = jwt.sign({ userId: id }, process.env.ACCESS_SECRET ?? "", {
    expiresIn: expiry,
  });

  return token;

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   maxAge: 30 * 24 * 3600 * 1000,
  // });
};

const clearJwtCookie = (res: Response) => {
  res.clearCookie("jwt");
};

interface JwtPayload {
  user_id: string;
}

export const verifyToken = async (
  req: any,
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

    const verified = jwt.verify(
      token,
      process.env.ACCESS_SECRET ?? ""
    ) as JwtPayload;

    req.user_id = verified.user_id;

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

      const token = setJwtCookie(res, user_id, "30d");

      res.status(201).json({
        token: token,
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
        const token = setJwtCookie(res, user.id, "30d");
        res.json({
          token: token,
          user_id: user.id,
        });
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

  app.get("/api/logoutUser", (req, res) => {
    clearJwtCookie(res);
    res.status(200).json({
      msg: "logged out successfully",
    });
  });

  app.get("/api/review", async (req, res) => {
    const inputSchema = z.object({
      node_id: z.string(),
    });

    try {
      const { node_id } = inputSchema.parse(req.query);

      const reviewRepo = getReviewRepository();
      const response = await reviewRepo.find({
        where: {
          node_id: node_id,
        },
      });
      res.json(response);
    } catch (e) {
      res.status(400).json({
        err: e,
      });
    }
  });

  app.post("/api/review", verifyToken, async (req: any, res) => {
    const inputSchema = z.object({
      node_id: z.string(),
      rating: z.number().min(0).max(5),
      comment: z.string(),
    });

    try {
      const { node_id, rating, comment } = inputSchema.parse(req.body);

      const user_id = req.user_id as number;
      const userRepo = getUserRepository();

      const user = await userRepo.findOne({
        where: {
          id: user_id,
        },
      });

      const reviewRepo = getReviewRepository();
      reviewRepo.insert({
        node_id: node_id,
        user_id: user?.id,
        user_name: user?.name,
        rating: rating,
        comment: comment,
      });

      res.json({
        msg: "added review successfully",
      });
    } catch (e) {
      res.status(400).json({
        error: e,
      });
    }
  });

  app.post("/api/node", verifyToken, async (req, res) => {
    const inputSchema = z.object({
      name: z.string(),
      city: z.string(),
      description: z.string(),
      lat: z.string(),
      lon: z.string(),
    });

    const { name, city, description, lat, lon } = inputSchema.parse(req.body);

    const mapNodeRepo = getMapNodeRepository();

    await mapNodeRepo.insert({
      name,
      city,
      description,
      lat,
      lon,
    });
  });
};
