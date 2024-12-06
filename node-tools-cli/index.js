const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
  .name("my-cli-App")
  .description("Our first CLI program")
  .version("1.0.0");

program
  .command("count")
  .description("Count the number of words in file")
  .argument("<filePath>", "path of the file")
  .action((filePath) => {
    console.log(`Your file name is ${filePath}`);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("invalid! file does not exist");
      } else {
        const characterCounts = data.split("").length;
        const wordsCounts = data.split(" ").length;
        console.log(
          `you have ${characterCounts} character including spaces in this file
& you have ${wordsCounts} words in this file
          `
        );
      }
    });
  });

program
  .command("add")
  .description("add todo")
  .argument("<newtodo>", "new todo to add")
  .action((newTodo) => {
    fs.readFile("./todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log("err-read ", err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.todos = [
          ...parsedData.todos,
          {
            text: newTodo,
            done: false,
          },
        ];
        const stringifiedTodos = JSON.stringify(parsedData);
        fs.writeFile("./todos.json", stringifiedTodos, (err) => {
          if (err) {
            console.log("err-write ", err);
          }
          console.log(`${newTodo} todo added`);
        });
      }
    });
  });

program
  .command("update")
  .description("update existing todo")
  .argument("<oldTodo>", "existing todo to update")
  .argument("<newTodo>", "new todo text")
  .action((oldTodo, newTodo) => {
    fs.readFile("./todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log("err-read ", err);
      } else {
        const parsedData = JSON.parse(data);
        const todoIndex = parsedData.todos.indexOf(oldTodo);

        if (todoIndex === -1) {
          console.log(`Todo '${oldTodo}' not found`);
          return;
        }

        parsedData.todos[todoIndex] = {
          text: newTodo,
          done: false,
        };

        const stringifiedTodos = JSON.stringify(parsedData);

        fs.writeFile("./todos.json", stringifiedTodos, (err) => {
          if (err) {
            console.log("err-write ", err);
          } else {
            console.log(`Todo updated from '${oldTodo}' to '${newTodo}'`);
          }
        });
      }
    });
  });

program
  .command("delete")
  .description("delete todo")
  .argument("[todo]", "todo to delete")
  .option("-a, --all", "delete all todos")
  .action((todo, options) => {
    fs.readFile("./todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log("err-read ", err);
        return;
      }

      const parsedData = JSON.parse(data);

      if (options.all) {
        parsedData.todos = [];
        const stringifiedTodos = JSON.stringify(parsedData);
        fs.writeFile("./todos.json", stringifiedTodos, (err) => {
          if (err) {
            console.log("err-write ", err);
            return;
          }
          console.log("All todos deleted");
        });
        return;
      }

      if (!todo) {
        console.log("Current todos:");
        parsedData.todos.forEach((t, index) => {
          const status = todo.done ? "✓" : " ";
          console.log(`${index + 1}. [${status}] ${todo.text}`);
        });
        return;
      }

      const todoIndex = parsedData.todos.indexOf(todo);
      if (todoIndex === -1) {
        console.log("This todo does not exist");
        return;
      }

      parsedData.todos = parsedData.todos.filter((t) => t !== todo);
      const stringifiedTodos = JSON.stringify(parsedData);

      fs.writeFile("./todos.json", stringifiedTodos, (err) => {
        if (err) {
          console.log("err-write ", err);
          return;
        }
        console.log(`"${todo}" has been deleted`);
      });
    });
  });

program
  .command("view")
  .description("view todos")
  .action(() => {
    fs.readFile("./todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log("err-read ", err);
      } else {
        const parsedData = JSON.parse(data);

        if (parsedData.todos.length === 0) {
          console.log("No todos found!");
          return;
        }

        parsedData.todos.forEach((todo, index) => {
          const status = todo.done ? "✓" : " ";
          console.log(`${index + 1}. [${status}] ${todo.text}`);
        });
      }
    });
  });

program
  .command("done")
  .description("mark a todo as done")
  .argument("<todo>", "todo to mark as done")
  .action((todo) => {
    fs.readFile("./todos.json", "utf-8", (err, data) => {
      if (err) {
        console.log("err-read ", err);
        return;
      }

      const parsedData = JSON.parse(data);
      const todoIndex = parsedData.todos.findIndex((t) => t.text === todo);

      if (todoIndex === -1) {
        console.log("This todo does not exist");
        return;
      }

      parsedData.todos[todoIndex].done = true;
      const stringifiedTodos = JSON.stringify(parsedData);

      fs.writeFile("./todos.json", stringifiedTodos, (err) => {
        if (err) {
          console.log("err-write ", err);
          return;
        }
        console.log(`${todo} has been marked as done`);
      });
    });
  });

program.parse();
