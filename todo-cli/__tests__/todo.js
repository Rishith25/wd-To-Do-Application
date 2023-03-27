/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const todoList = require("../todo");
const today = new Date();
const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

// eslint-disable-next-line no-undef
describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: today.toISOString().slice(0, 10),
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    const oneDay = 60 * 60 * 24 * 1000;
    const yesterday = new Date(today.getTime() - 1 * oneDay)
      .toISOString()
      .slice(0, 10);
    add({
      title: "Test todo-1",
      completed: false,
      dueDate: yesterday,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = all.filter(
      (item) =>
        new Date(item.dueDate).toISOString().slice(0, 10) <
        new Date().toISOString().slice(0, 10)
    );
    expect(overdue()).toEqual(overdueItems);
  });

  test("Should retrieve Due Today items", () => {
    const dueTodayItems = all.filter(
      (item) =>
        new Date(item.dueDate).toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10)
    );
    expect(dueToday()).toEqual(dueTodayItems);
  });

  test("Should retrieve Due Later items", () => {
    const dueLaterItems = all.filter(
      (item) =>
        new Date(item.dueDate).toISOString().slice(0, 10) >
        new Date().toISOString().slice(0, 10)
    );
    expect(dueLater()).toEqual(dueLaterItems);
  });
});
