import app from "./app.js";
import logger from "./configs/logger.config.js";



// env variables
const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});