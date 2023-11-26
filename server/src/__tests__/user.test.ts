import request from "supertest";
import { app } from "../server";

describe("Server", () => {
 
  test('it should respond with an access token on successful login', async () => {
    const response = await request(app)
      .post('/users/auth/login')
      .send({
        email: '',//add valid email
        password: '',//add the password
      });
    expect(response.status).toBe(200);
  });

  test('it should respond with an error on invalid login credentials', async () => {
    const response = await request(app)
      .post('/users/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'invalidpassword',
      });

    expect(response.status).toBe(401);
  });

  test('it should respond with success on valid user registration', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        userdata: {
          // enter valid user data for registration
        },
      });

    expect(response.status).toBe(200);
  });

  test('it should respond with an error on invalid user registration', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        userdata: {
          // Provide invalid user data for registration
        },
      });

    expect(response.status).toBe(400);
  });
});