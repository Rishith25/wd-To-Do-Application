/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const todoList = require("../todo");

const dateFormat = (d) => {
  return d.toISOString().slice(0, 10);
};
var dateToday = new Date();
const today = dateFormat(dateToday);
const yesterday = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

// eslint-disable-next-line no-undef
describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo-1",
      completed: false,
      dueDate: today,
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo-1",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItemsCount = overdue().length;
    add({
      title: "Test overDue-1",
      dueDate: yesterday,
      completed: false,
    });
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(overdueItemsCount + 1);
    expect(overdueItems[0].dueDate).toEqual(yesterday);
    expect(overdueItems[0].title).toEqual("Test overDue-1");
  });

  test("Should retrieve Due Today items", () => {
    const dueTodayItemsCount = dueToday().length;
    add({
      title: "Test dueToday-1",
      completed: false,
      dueDate: today,
    });
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(dueTodayItemsCount + 1);
    expect(dueTodayItems[0].dueDate).toEqual(today);
    expect(dueTodayItems[0].title).toEqual("Test todo-1");
    expect(dueTodayItems[2].dueDate).toEqual(today);
    expect(dueTodayItems[2].title).toEqual("Test dueToday-1");
  });

  test("Should retrieve Due Later items", () => {
    const dueLaterItemsCount = dueLater().length;
    add({
      title: "Test dueLater-1",
      dueDate: tomorrow,
      completed: false,
    });
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(dueLaterItemsCount + 1);
    expect(dueLaterItems[0].dueDate).toEqual(tomorrow);
    expect(dueLaterItems[0].title).toEqual("Test dueLater-1");
  });
});
