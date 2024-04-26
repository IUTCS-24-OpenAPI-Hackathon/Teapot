import { Express } from "express";

export const registerUserRoutes = (app: Express) => {
  app.get("/users/", (req, res) => {
    res.json({
      msg: "hello world",
    });
  });
};
