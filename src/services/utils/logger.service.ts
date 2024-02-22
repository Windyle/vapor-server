import * as winston from "winston";
const { timestamp, printf, colorize, align, combine, json } = winston.format;

const LogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const consoleFormat: winston.Logform.Format = combine(
  colorize(),
  timestamp(),
  align(),
  printf((info) => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
  })
);

const fileFormat: winston.Logform.Format = combine(
  timestamp({
    format: "YYYY-MM-DD hh:mm:ss.SSS A",
  }),
  json(),
  printf(({ timestamp, level, message }) => `[${timestamp}] - [${level.toUpperCase()}] - ${message}`)
);

export const logger = winston.createLogger({
  levels: LogLevels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
      level: "debug",
    }),
    new winston.transports.File({
      format: fileFormat,
      level: "info",
      filename: "logs/server.log",
    }),
  ],
});