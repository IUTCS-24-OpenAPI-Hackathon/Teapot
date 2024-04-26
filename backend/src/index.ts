import "reflect-metadata";
import express from "express";

import { initiateConnection } from "./data";

// importing routes
import { registerUserRoutes } from "./routes/userRoutes";

// defining constants
const PORT = 3000;

// actual app
const app = express();

registerUserRoutes(app);

const run = async () => {
  await initiateConnection();

  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};

run();
