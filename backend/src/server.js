import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`🚀 PORT IS LISTING : http://localhost:${process.env.PORT}`);
});
