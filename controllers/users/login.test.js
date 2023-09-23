import mongoose from "mongoose";
import request from "supertest";

import app from "../../app.js";

const { DB_HOST, PORT, JWT_SECRET } = process.env;

describe("test login controller", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("should return status code 200, token, and user object with email and subscription fields", async () => {
    const loginData = {
      email: "mikarteta@arsenal.com",
      password: "6881",
    };
    const { status, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(status).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body.user).toHaveProperty("email", loginData.email);
    expect(body.user).toHaveProperty("subscription", "starter");
  });

  test("should return status code 401 for invalid username and password", async () => {
    const { status, body } = await request(app)
      .post("/api/users/login")
      .send({ email: "invaliduser", password: "invalidpassword" });

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Email or password is wrong");
  });

});
