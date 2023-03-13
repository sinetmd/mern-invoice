import express from "express";
import "dotenv/config";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// can't post a nested object
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
  res.json({ Hi: "Welcome to the Invoice App" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("✔")} 👍 Server running in ${chalk.yellow.bold(
      process.env.NODE_ENV
    )} mode on port ${chalk.blue.bold(PORT)}`
  );
});
