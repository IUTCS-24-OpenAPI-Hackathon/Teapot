import { AppDataSource } from "./data-source";

export const initiateConnection = async () => {
  AppDataSource.initialize();
};
