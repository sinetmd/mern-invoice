import mongoose from "mongoose";
import chalk from "chalk";
import { systemLogs } from "../utils/Logger.js";

const connectionToDB = async () => {
  try {
    const connectionParams = {
      dbName: process.env.DB_NAME,
    };

    const connect = await mongoose.connect(
      process.env.MONGO_URI, // this is not from .env file but from a environemt local.yml file (local.yml -> )
      connectionParams
    );

    console.log(
      `${chalk.blue.bold(`MongoDB connected: ${connect.connection.host}`)}`
    );

    systemLogs.info(`MongoDB connected: ${connect.connection.host}`);

  } catch (error) {
    console.error(`${chalk.red.bold(`Error: ${error.message}`)}`);
    process.exit(1);
  }
};

export default connectionToDB;
