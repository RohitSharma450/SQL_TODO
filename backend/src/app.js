import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./db/db.js";
import todoRouter from "./router/todo.router.js";

const app = express();

const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use("/api", todoRouter);

app.get("/", async (_, res) => {
  const result = await pool.query("SELECT current_database()");
  res.status(202).json(`Server is runing: ${result.rows[0].current_database}`);
});

export { app };
