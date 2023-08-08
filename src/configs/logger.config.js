import winston from "winston";

const enumeratErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { stack: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumeratErrorFormat(),
    process.env.NODE_ENV === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message}) =>
        `${level}: ${message}`
    )
  ),

  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;

// To be used as logger.info("message") or logger.error("message")