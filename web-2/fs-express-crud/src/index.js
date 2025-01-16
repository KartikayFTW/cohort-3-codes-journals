// @ts-nocheck
import express from "express";
import crypto from "crypto";
import fs from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      error: "Title and description are required",
    });
  }

  let todoId = crypto.randomUUID();

  const filePath = path.join(__dirname, "todos.json");
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      if (readErr.code === "ENOENT") {
        const newTodo = {
          id: todoId,
          title,
          description,
          isCompleted: false,
        };
        const todos = [newTodo];

        fs.writeFile(filePath, JSON.stringify(todos, null, 2), (writeErr) => {
          if (writeErr) {
            console.error("Error creating todo file:", writeErr);
            return res.status(500).json({
              error: "Failed to create todos file",
            });
          }
          return res.status(201).json({
            message: "new todo created",
            newTodo,
          });
        });
        return;
      }
      console.error("Error reading todos file:", readErr);
      return res.status(500).json({
        error: "Failed to read todos file",
      });
    }
    try {
      const todos = JSON.parse(data);
      const newTodo = {
        id: todoId,
        title,
        description,
        isCompleted: false,
      };
      todos.push(newTodo);

      fs.writeFile(filePath, JSON.stringify(todos, null, 2), (writeErr) => {
        if (writeErr) {
          console.log("Error saving todo: ", writeErr);
          return res.status(500).json({
            error: "Failed to save todo",
          });
        }
        return res.status(201).json({ message: "new todo created", newTodo });
      });
    } catch (parseError) {
      console.error("Error parsing todos data:", parseError);
      return res.status(500).json({
        error: "Failed to parse todos data",
      });
    }
  });
});

app.get("/todos", (req, res) => {
  const filePath = path.join(__dirname, "todos.json");
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      if (readErr.code === "ENOENT") {
        return res.status(200).json({
          error: "No todos found",
          todos: [],
        });
      }
      console.error("error reading todos: ", readErr);
      return res.status(500).json({
        error: "failed to read todos",
      });
    }
    try {
      const todos = JSON.parse(data);
      return res.status(200).json({
        message: "todos fetch succesfully",
        count: todos.length,
        todos,
      });
    } catch (parseError) {
      console.error("Error parsing todos data:", parseError);
      return res.status(500).json({
        error: "Failed to parse todos data",
      });
    }
  });
});

app.get("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const filePath = path.join(__dirname, "todos.json");
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      if (readErr.code === "ENOENT") {
        return res.status(404).json({
          error: "todo details not found",
          todo: {},
        });
      }
      console.error("error reading error", readErr);
      return res.status(500).json({
        error: "Falied to read todo",
      });
    }
    try {
      const todos = JSON.parse(data);
      const todoDetails = todos.find((t) => t.id === todoId);
      return res.status(200).json({
        message: "todo retreived succesfully",
        todo: todoDetails,
      });
    } catch (parseError) {
      console.error("Error parsing todo details", parseError);
      return res.status(500).json({
        error: "Failed to parse todo data",
      });
    }
  });
});

app.patch("/todos/:todoId", (req, res) => {
  const { title, description, isCompleted } = req.body;
  if (!title && !description && typeof isCompleted !== "boolean") {
    return res.status(400).json({
      error:
        "At least one field (title, description, or isCompleted) must be provided",
    });
  }

  const todoId = req.params.todoId;
  const filePath = path.join(__dirname, "todos.json");
  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      if (readErr.code === "ENOENT") {
        return res.status(404).json({
          error: "No todos found",
          todos: [],
        });
      }
      console.error("error reading todofile", readErr);
      return res.status(500).json({
        message: "Failed to read todos file",
      });
    }
    try {
      if (!data) {
        return res.status(200).json({
          message: "no todos available",
          todos: [],
        });
      }
      const todos = JSON.parse(data);
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex === -1) {
        return res.status(404).json({
          error: "todo not found",
        });
      }
      todos[todoIndex] = {
        ...todos[todoIndex],
        ...(title && { title }),
        ...(description && { description }),
        ...(typeof isCompleted === "boolean" && { isCompleted }),
      };
      fs.writeFile(filePath, JSON.stringify(todos, null, 2), (writeError) => {
        if (writeError) {
          console.error("error updating todo ", writeError);
          return res.status(500).json({
            error: "Error updating todo",
          });
        }
        return res.status(200).json({
          message: "todo updated succesfully",
          todo: todos[todoId],
        });
      });
    } catch (parseError) {
      console.error("Error passing todos data:", parseError);
      res.status(500).json({
        error: "Failed to parse todo data",
      });
    }
  });
});

app.delete("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const filePath = path.join(__dirname, "todos.json");

  fs.readFile(filePath, "utf-8", (readErr, data) => {
    if (readErr) {
      if (readErr.code === "ENOENT") {
        return res.status(404).json({
          error: "No todos found",
          todos: [],
        });
      }
      console.error("error reading todos", readErr);
      return res.status(500).json({
        error: "Failed to read todos file",
      });
    }
    try {
      const todos = JSON.parse(data);
      const remainingTodos = todos.filter((todo) => todo.id !== todoId);
      fs.writeFile(
        filePath,
        JSON.stringify(remainingTodos, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("error updating todo ", writeError);
            return res.status(500).json({
              error: "Error updating todo",
            });
          }
          return res.status(200).json({
            message: "todo deleted Succesfully",
          });
        }
      );
    } catch (parseError) {
      console.error("Error parsing todo data ", parseError);
      return res.status(500).json({
        error: "Failed to parse todo data",
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
