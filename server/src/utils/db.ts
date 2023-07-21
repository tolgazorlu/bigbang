import mongoose, { ConnectOptions } from "mongoose";
import chalk from "chalk";

const User = require('../models/user')

const keys = require("../config/keys");
const { database } = keys;

const setupDB = async () => {
  try {
    mongoose
      .connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log(chalk.bgGreen("MongoDB Database connected!"));
      })
      .catch((error) => {
        console.log(chalk.bgRed("MongoDB Database not connected!"));
      });
  } catch (error) {
    return null;
  }
};

module.exports = setupDB;