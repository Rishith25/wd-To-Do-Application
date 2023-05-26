/* eslint-disable no-unused-vars */
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
      // define association here
    }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId: userId,
      });
    }

    setCompletionStatus(completed) {
      const setComplete = completed === true ? false : true;
      return this.update({ completed: setComplete });
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id,
          userId,
        },
      });
    }

    static completedItems(userId) {
      return this.findAll({
        where: {
          completed: true,
          userId,
        },
      });
    }

    static getTodoList() {
      return this.findAll();
    }
    static async overdue(userId) {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
          userId,
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
          userId,
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
          userId,
          completed: false,
        },
        order: [["id", "ASC"]],
      });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: 5,
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }

//     static addTodo({ title, dueDate }) {
//       return this.create({ title: title, dueDate: dueDate, completed: false });
//     }

//     static getTodos() {
//       return this.findAll();
//     }

//     static async overdue() {
//       return this.findAll({
//         where: {
//           dueDate: {
//             [Op.lt]: new Date(),
//           },
//           completed: false,
//         },
//       });
//     }

//     static async dueToday() {
//       // FILL IN HERE TO RETURN ITEMS DUE tODAY
//       return Todo.findAll({
//         where: {
//           dueDate: {
//             [Op.eq]: new Date(),
//           },
//         },
//         order: [["id", "ASC"]],
//       });
//     }

//     static async dueLater() {
//       // FILL IN HERE TO RETURN ITEMS DUE LATER
//       return Todo.findAll({
//         where: {
//           dueDate: {
//             [Op.gt]: new Date(),
//           },
//         },
//         order: [["id", "ASC"]],
//       });
//     }

//     markAsCompleted() {
//       return this.update({ completed: true });
//     }

//     deleteTodo() {
//       return this.destroy();
//     }
//   }
//   Todo.init(
//     {
//       title: DataTypes.STRING,
//       dueDate: DataTypes.DATEONLY,
//       completed: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "Todo",
//     }
//   );
//   return Todo;
// };
