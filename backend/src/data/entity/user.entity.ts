import { ZodRawShape, z } from "zod";

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { AppDataSource } from "../data-source";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;
}

export const getUserRepository = () => {
  return AppDataSource.getRepository(User);
};

// deifne zod schema here following the class definition above
export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type UserRepository = ReturnType<typeof getUserRepository>;
