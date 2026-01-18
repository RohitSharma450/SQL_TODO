import pool from "../db/db.js";

export const createTodos = async (data) => {
  const result = await pool.query(
    "INSERT INTO todo (data) VALUES ($1) RETURNING * ",
    [data],
  );
  return result.rows[0];
};

export const completeTodo = async (id, completed) => {
  const result = await pool.query(
    "UPDATE todo SET completed = $1 WHERE id = $2 RETURNING * ",
    [completed, id],
  );

  return result.rows[0];
};

export const deleteTodo = async (id) => {
  const result = await pool.query(
    "DELETE FROM todo WHERE id = $1 RETURNING * ",
    [id],
  );
  return result.rows[0];
};

export const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todo");
  return result.rows;
};
