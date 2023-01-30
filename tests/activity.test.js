const request = require("supertest");
const app = require("../app");
const router = require("../routes/auth");

describe("GET /api/activities", () => {
  it("should get all the activities", async () => {
    const token = await request(app).post("/signin").send({
      email: process.env.EMAIL,
      password: process.env.JWT_SEC,
    });

    const response = await request(app)
      .get("/api/activities")
      .set({
        Authorization: "bearer " + token.body.token,
        "Content-Type": "application/json",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
