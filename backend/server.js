import express from "express";
import "dotenv/config";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { morganMiddleware, systemLogs } from "./utils/Logger.js";
import connectionToDB from "./config/connectDB.js";
import mongoSanitize from "express-mongo-sanitize";
import authRoutes from "./routes/authRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

await connectionToDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// can't post a nested object
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.
app.use(mongoSanitize());

app.use(morganMiddleware);

app.get("/api/v1/test", (req, res) => {
  res.json({ Hi: "Welcome to the Invoice App" });
});

// routes
app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 1997;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("✔")} 👍 Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)}`
  );

  systemLogs.error("error", (err) => {
    console.error("Logger error: ", err);
  });

  systemLogs.info(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
