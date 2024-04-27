import { ZodRawShape, z } from "zod";

import { Entity, Column, Generated, PrimaryColumn } from "typeorm";
import { AppDataSource } from "../data-source";

@Entity()
export class MapNode {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  city: string;

  @Column("text")
  lat: string;

  @Column("text")
  lon: string;
}

export const getMapNodeRepository = () => {
  return AppDataSource.getRepository(MapNode);
};

// deifne zod schema here following the class definition above
export const mapNodeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  city: z.string(),
  lat: z.string(),
  lon: z.string(),
});

export type MapNodeRepository = ReturnType<typeof getMapNodeRepository>;
