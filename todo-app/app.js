/* eslint-disable no-unused-vars */
const express = require("express");
var csrf = require("tiny-csrf");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long", ["POST", "PUT", "DELETE"]));

// Set EJS as view engine
app.set("view engine", "ejs");
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async function (request, response) {
  try {
    const allTodos = await Todo.getTodoList();
    const overdue = await Todo.overdue();
    const dueToday = await Todo.dueToday();
    const dueLater = await Todo.dueLater();
    const completedList = await Todo.completedItems();
    if (request.accepts("html")) {
      response.render("index", {
        allTodos,
        overdue,
        dueToday,
        dueLater,
        completedList,
        csrfToken: request.csrfToken(),
      });
    } else {
      response.json({
        allTodos,
        overdue,
        dueToday,
        dueLater,
        completedList,
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// app.get("/", async function (request, response) {
//   const allTodos = await Todo.getTodoList();
//   if (request.accepts("html")) {
//     response.render("index", {
//       allTodos,
//     });
//   } else {
//     response.json({
//       allTodos,
//     });
//   }
// });

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  // FILL IN YOUR CODE HERE
  try {
    const todo = await Todo.findAll();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  console.log("Creating a todo", request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return response.redirect("/");
    // return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  try {
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    return response.status(422).json(error);
  }
  // try {
  //   const todo = await Todo.findByPk(request.params.id);
  //   if (todo) {
  //     const deletedTodo = await todo.deleteTodo();
  //     return response.json(true);
  //   } else {
  //     return response.json(false);
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return response.status(422).json(error);
  // }

  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;

// /* eslint-disable no-unused-vars */
// const { request, response } = require("express")
// const express = require('express');
// const app = express();
// const { Todo } = require("./models")
// const bodyParser = require("body-parser");
// const { where } = require("sequelize");
// app.use(bodyParser.json());
// // app.METHOD(PATH, HANDLER)
// // or
// // app.METHOD(path, callback [, callback ...])

// app.get("/todos", (request, response) => {
//     console.log("Todo List");
// })

// app.post("/todos", async (request, response) => {
//     console.log("Creating a Todo", request.body);
//     //Todo
//     try {
//         const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
//         return response.json(todo)
//     } catch (error) {
//         console.log(error)
//         return response.status(422).json(error)
//     }

// })

// // PUT http://mytodoapp.com/todos/123/markAsCompleted
// app.put("/todos/:id/markAsCompleted", async (request, response) => {
//     console.log("We have to update a todo with ID:", request.params.id);
//     const todo = await Todo.findByPk(request.params.id);
//     try {
//         const updatedTodo = await todo.markAsCompleted();
//         return response.json(updatedTodo);
//     } catch (error) {
//         console.log(error);
//         return response.status(422).json(error)
//     }
// })

// app.delete("/todos/:id", (request, response) => {
//     console.log("Delete a todo by ID: ", request.params.id);
// })

// module.exports = app;
