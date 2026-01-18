import express from "express";
import {
  completeTodoController,
  createTodoController,
  deleteTodoController,
  getAllTodosController,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/todo", getAllTodosController);

router.post("/create", createTodoController);

router.delete("/delete/:id", deleteTodoController);

router.put("/completed/:id", completeTodoController);

export default router;
