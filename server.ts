import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import express from "express";
import next from "next";
import http from "http";

const port = +process.env.PORT! || 3000;
const host = process.env.HOSTNAME || "localhost";
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({dev, dir: "."});
const handler = nextApp.getRequestHandler() as any;

(async () => {
  try {
    await nextApp.prepare();
    const app = express();

    app.get("*", (req, res) => {
      return handler(req, res);
    });

    const server = http.createServer({}, app);

    server.listen(port, host, () => {
      console.log(
        chalk.green("ready") +
          ` - started server on http${dev ? "" : "s"}://${host}:${port}`,
      );
    });
  } catch (error) {
    console.log(`An error occurred, unable to start the server:\n ${error}`);
  }
})();
