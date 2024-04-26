import { ZodRawShape, z } from "zod";

import { Entity, Column, Generated, IntegerType } from "typeorm";
import { AppDataSource } from "../data-source";

@Entity()
export class Review {
  @Column()
  @Generated("uuid")
  id: string;

  @Column("text")
  node_id: string;

  @Column("int")
  user_id: number;

  @Column("text")
  user_name: string;

  @Column("int")
  rating: number;

  @Column("text")
  comment: string;
}

export const getReviewRepository = () => {
  return AppDataSource.getRepository(Review);
};

// deifne zod schema here following the class definition above
export const reviewSchema = z.object({
  id: z.string().uuid(),
  node_id: z.string(),
  user_id: z.number(),
  user_name: z.string(),
  rating: z.number(),
  comment: z.string(),
});

export type ReviewRepository = ReturnType<typeof getReviewRepository>;
