/* eslint-disable no-unused-vars */
const { Model } = require("sequelize");
const { connect } = require("./connectDB");
const { sync } = require("./TodoModel");
const Todo = require("./TodoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "3rd Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with ID : ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} items in the table!`);
  } catch (error) {
    console.error(error);
  }
};

const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll({
      // where:{
      //     completed: true
      // },
      // order:[
      //     ['id','DESC']
      // ]
    });
    const todoList = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

const getSingleTodo = async () => {
  try {
    const todo = await Todo.findOne({
      // where:{
      //     completed: false
      // },
      // order:[
      //     ['id','DESC']
      // ]
    });
    console.log(todo.displayableString());
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteItem = async (id) => {
  try {
    const deletedRowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Deleted ${deletedRowCount} rows!`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  // await createTodo();
  // await countItems();
  // await getAllTodos();
  // await getSingleTodo();
  // await updateItem(2);
  // await deleteItem();
  // await getAllTodos();
})();
