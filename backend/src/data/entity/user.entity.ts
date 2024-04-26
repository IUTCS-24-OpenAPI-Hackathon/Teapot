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
}

export const getUserRepository = () => {
  const repo = AppDataSource.getRepository(User);

  // this way i can write the db queries and make sure db queries work before using them in services
  const userRepo = {
    // createUser: () => {
    //   repo.findOne(())
    // },

    findUserWithId: (id: number) => {
      // do sth here
      return;
    },
  };
  return userRepo;
};

// deifne zod schema here following the class definition above
export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export type UserRepository = ReturnType<typeof getUserRepository>;
