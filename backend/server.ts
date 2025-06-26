import dotenv from "dotenv";
import app from "./src/app";
import { appDataSource } from "./src/data-source";

dotenv.config();

const PORT = process.env.PORT || 3002;

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
