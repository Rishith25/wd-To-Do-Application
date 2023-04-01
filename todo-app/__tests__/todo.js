/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require("supertest");

const db = require("../models/index");
const app = require("../app");

let server, agent;


describe("Todo test suite", () => {
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
        server = app.listen(3000, () => { });
        agent = request.agent(server);
    });
    afterAll(async () => {
        await db.sequelize.close();
        server.close();
    });

    test("responds with json at /todos", async () => {
        const response = await agent.post('/todos').send({
            'title': "Buy Milk",
            dueDate: new Date().toISOString(),
            completed: false
        });
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8");

        const parsedResponse = JSON.parse(response.text);
        expect(parsedResponse.id).toBeDefined();
    });

    test("Mark a todo as complete", async () => {
        const response = await agent.post('/todos').send({
            'title': "Buy Milk",
            dueDate: new Date().toISOString(),
            completed: false
        });
        const parsedResponse = JSON.parse(response.text);
        const todoID = parsedResponse.id;

        expect(parsedResponse.completed).toBe(false);

        const markCompleteRespose = await agent.put(`/todos/${todoID}/markAsCompleted`).send();
        const parsedUpdateRespose = JSON.parse(markCompleteRespose.text);
        expect(parsedUpdateRespose.completed).toBe(true);
    });
    
    test("Fetches all todos in the database using /todos endpoint", async () => {
        await agent.post("/todos").send({
          title: "Buy xbox",
          dueDate: new Date().toISOString(),
          completed: false,
        });
        await agent.post("/todos").send({
          title: "Buy ps3",
          dueDate: new Date().toISOString(),
          completed: false,
        });
        const response = await agent.get("/todos");
        const parsedResponse = JSON.parse(response.text);
        expect(parsedResponse.length).toBe(4);
        expect(parsedResponse[3]["title"]).toBe("Buy ps3");
    },10000);
    
    test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
        // FILL IN YOUR CODE HERE
        const todo = await agent.post("/todos").send({
            title: "Test todo",
            dueDate: new Date().toISOString(),
            completed: false
        });
        const parsedResponse = JSON.parse(todo.text);
        const todoID = parsedResponse.id;
        const DeleteTodo = await agent.delete(`/todos/${todoID}`).send();

        const response = await agent.get(`/todos/${todoID}`);
        const DeletedResponse = JSON.parse(response.text);
        expect(DeletedResponse).toBeNull();
    },10000);
})