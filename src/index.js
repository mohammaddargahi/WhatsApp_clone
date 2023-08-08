import app from "./app.js";
import logger from "./configs/logger.config.js";



// env variables
const PORT = process.env.PORT || 9000;

let server;

server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log("process id", process.pid);
});



// handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Shutting down the server...");
    process.exit(1);
  } else {
    process.exit(1);
  }
  }

  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  }

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // SIGTERM signal
  process.on("SIGTERM", () => {
    if (server) {
      logger.info("SIGTERM received, shutting down gracefully");
      server.close(() => {
        logger.info("Process terminated");
        process.exit(0);
      });
    }
    
  })