const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const basicLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp({ format: "MM/dd/YY | HH:mm:ss " }), myFormat),
    defaultMeta: { service: "user-service" },
    transports: [new transports.File({ filename: "logger.log" })],
  });
};

module.exports = basicLogger;
