import { Express, Response } from "express";
import { getUserRepository } from "../data/entity/user.entity";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

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

export const registerUserRoutes = (app: Express) => {
  app.post("/api/signup", async (req, res) => {
    const inputSchema = z.object({
      name: z.string(),
      email: z.string(),
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

      res.status(201).json(savedUser);
    } catch (e) {
      res.status(400).json({
        error: e,
      });
    }
  });

  // app.post("/api/loginUser", async (req, res) => {
  //   const inputSchema = z.object({
  //     email: z.string(),
  //     password: z.string(),
  //   });

  //   try {
  //     const { email, password } = inputSchema.parse(req.body)
  //     const userRepo = getUserRepository();
  //     const user = await userRepo.findOne({
  //       email: email,
  //       password: bcrypt.
  //     })

  //     console.log(user);

  //     if (user && (await user.matchPassword(password))) {
  //       setJwtCookie(res, user._id, "30d");
  //       res.json(user);
  //     } else {
  //       sendError(res, 401, "Invalid email or password");
  //     }
  //   }

  // });

  app.post("/api/logoutUser", (req, res) => {
    clearJwtCookie(res);
    res.status(200).json({
      msg: "logged out successfully",
    });
  });

  // app.post("/api/addReview")
};
