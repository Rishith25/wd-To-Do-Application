/* eslint-disable no-unused-vars */
const { request, response } = require("express")
const express = require('express');
const app = express();
const { Todo } = require("./models")
const bodyParser = require("body-parser");
const { where } = require("sequelize");
app.use(bodyParser.json());
// app.METHOD(PATH, HANDLER)
// or
// app.METHOD(path, callback [, callback ...])


app.get("/todos", (request, response) => {
    console.log("Todo List");
})

app.post("/todos", async (request, response) => {
    console.log("Creating a Todo", request.body);
    //Todo
    try {
        const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
        return response.json(todo)
    } catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }

})

// PUT http://mytodoapp.com/todos/123/markAsCompleted
app.put("/todos/:id/markAsCompleted", async (request, response) => {
    console.log("We have to update a todo with ID:", request.params.id);
    const todo = await Todo.findByPk(request.params.id);
    try {
        const updatedTodo = await todo.markAsCompleted();
        return response.json(updatedTodo);
    } catch (error) {
        console.log(error);
        return response.status(422).json(error)
    }
})

app.delete("/todos/:id", (request, response) => {
    console.log("Delete a todo by ID: ", request.params.id);
})

module.exports = app;
