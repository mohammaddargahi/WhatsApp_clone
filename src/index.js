
import app from "./app.js";



// env variables
const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});