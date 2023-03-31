/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// models/todo.js
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

const dateFormat = (d) => {
  return d.toISOString().slice(0, 10);
};
var dateToday = new Date();
const today = new Date().toISOString().slice(0, 10);
const yesterday = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      // console.log(params);
      return await Todo.create(params);
    }

    static associate(models) {
      // define association here
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Todo list \n");
      const str3 = await Todo.display();
      console.log(str3);
      console.log("\n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueitems = await this.overdue();
      console.log(overdueitems);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const duetodayitems = await this.dueToday();
      console.log(duetodayitems);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const duelateritems = await this.dueLater();
      console.log(duelateritems);
      console.log("\n");
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const overDueItems = await this.findAll({
        where: {
          dueDate: { [Op.lt]: today },
          // completed: false
        },
      });
      const overdueList = overDueItems
        .map((todo) => todo.displayableString())
        .join("\n");
      return overdueList;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const DueTodayItems = await this.findAll({
        where: {
          dueDate: today,
        },
      });
      const duetodayList = DueTodayItems.map((todo) =>
        todo.displayableString()
      ).join("\n");
      return duetodayList;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const DueLaterItems = await this.findAll({
        where: {
          dueDate: { [Op.gt]: today },
          completed: false,
        },
      });
      const duelaterList = DueLaterItems.map((todo) =>
        todo.displayableString()
      ).join("\n");
      return duelaterList;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const task = await Todo.findByPk(id);
      task.completed = true;
      return await task.save();
    }

    static async display() {
      const todos = await Todo.findAll();
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      return todoList;
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

// // models/todo.js
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//      static async addTask(params) {
//       return  await Todo.create(params);
//     }
//     static associate(models) {
//       // define association here
//     }
//     displayableString() {
//       let checkbox = this.completed ? "[x]" : "[ ]";
//       return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
//     }
//   }
//   Todo.init({
//     title: DataTypes.STRING,
//     dueDate: DataTypes.DATEONLY,
//     completed: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Todo',
//   });
//   return Todo;
// };
