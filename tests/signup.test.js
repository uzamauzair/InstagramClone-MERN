const request = require("supertest");
const app = require("../app");
const router = require("../routes/auth");

test("Should signup a user", async () => {
  const res = await request(app).post("/signup").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    pic: "https://example.com/pic.jpg",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("saved successfully");
});

test("Should return error if fields are missing", async () => {
  const res = await request(app).post("/signup").send({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  expect(res.statusCode).toBe(422);
  expect(res.body.error).toBe("please add all the fields");
});

test("Should return error if email already exists", async () => {
  await request(app).post("/signup").send({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    pic: "https://example.com/pic.jpg",
  });

  const res = await request(app).post("/signup").send({
    name: "Jane Doe",
    email: "johndoe@example.com",
    password: "password123",
    pic: "https://example.com/pic.jpg",
  });

  expect(res.statusCode).toBe(422);
  expect(res.body.error).toBe("user already exists with that email");
});
