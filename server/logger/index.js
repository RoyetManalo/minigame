const basicLogger = require("./basicLogger");

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = basicLogger();
}

module.exports = logger;
