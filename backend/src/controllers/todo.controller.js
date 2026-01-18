// controllers/todo.controller.js
import {
  completeTodo,
  createTodos,
  deleteTodo,
  getAllTodos,
} from "../models/todo.model.js";

export const createTodoController = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !data.trim()) {
      return res.status(400).json({
        success: false,
        message: "Data is required to save",
      });
    }

    const result = await createTodos(data);

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const completeTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed value must be boolean",
      });
    }

    const result = await completeTodo(id, completed);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task Completed",
      data: result,
    });
  } catch (error) {
    console.log("COMPLETED ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await deleteTodo(id);

    return res.status(201).json({
      success: true,
      message: "Todo delete successfully",
      data: result,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTodosController = async (req, res) => {
  try {
    const todos = await getAllTodos();

    res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("GET ALL TODOS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
