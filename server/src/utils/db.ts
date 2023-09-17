import mongoose, { ConnectOptions } from "mongoose";
import chalk from "chalk";

const keys = require("../config/keys");
const { database } = keys;

const setupDB = async () => {
  try {
    await mongoose
      .connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as ConnectOptions)
      .then(() => {
        console.log(chalk.bgGreen("MongoDB Database connected!"));
      })
      .catch((error) => {
        console.log(chalk.bgRed(error));
      });
  } catch (error) {
    return null;
  }
};

module.exports = setupDB;