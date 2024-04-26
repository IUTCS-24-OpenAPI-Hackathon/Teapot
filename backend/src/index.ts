import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { z } from "zod";

import { initiateConnection } from "./data";

// importing routes
import { registerUserRoutes } from "./routes/userRoutes";

// importing services and types
import {
  findAttractionsAroundCities,
  findAttractionsAroundCoords,
} from "./external/osm";

// defining constants
const PORT = 3000;

// actual app
const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

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

app.post("/getAttractionsFromCity", async (req, res) => {
  const inputSchema = z.object({
    lat: z.number(),
    lon: z.number(),
    city: z.string(),
  });

  try {
    const { lat, lon, city } = inputSchema.parse(req.body);
    console.log(req.body);
    const attractions = await findAttractionsAroundCities(lat, lon, city);
    res.json(attractions);
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
});

registerUserRoutes(app);

const run = async () => {
  await initiateConnection();

  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};

run();
