import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { initiateConnection } from "./data";

// importing routes
import { registerUserRoutes } from "./routes/userRoutes";

// importing services and types
import { findAttractionsAroundCoords } from "./external/osm";

// defining constants
const PORT = 3000;

// actual app
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/getAttractions", async (req, res) => {
  const inputSchema = z.object({
    lat: z.number(),
    lon: z.number(),
    radius: z.number(),
  });

  try {
    const { lat, lon, radius } = inputSchema.parse(req.body);
    console.log(req.body);
    const attractions = await findAttractionsAroundCoords(lat, lon, radius);
    console.log(attractions, "these are the attractions");
    res.json(attractions);
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
});

// registerUserRoutes(app);

const run = async () => {
  await initiateConnection();

  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};

run();
