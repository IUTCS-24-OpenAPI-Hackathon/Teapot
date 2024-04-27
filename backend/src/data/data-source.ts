import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Review } from "./entity/reviews.entity";
import { MapNode } from "./entity/node.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db",
  synchronize: true,
  logging: true,
  entities: [User, Review, MapNode],
  subscribers: [],
  migrations: [],
});
