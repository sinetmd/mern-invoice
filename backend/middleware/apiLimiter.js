//create a limiter for our backend api
import rateLimit from "express-rate-limit";
import { systemLogs } from "../utils/Logger.js";

// api limiter attempts
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  // 100 request per window (windowMs: 15min)
  max: 100,
  message: {
    message:
      "Too many requests from this IP address, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15min
  // 100 request per window (windowMs: 15min)
  max: 20,
  message: {
    message:
      "Too many login attempts from this IP address, please try again after 30 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
