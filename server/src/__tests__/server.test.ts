import request from "supertest";
import { app } from "../server";

describe("Server", () => {
//   test("use banners and get 200 status", async () => {
//     const res = await request(app).get("/api/bannersImage");
//     expect(res.statusCode).toEqual(200);
//   });
// });
// that test pass

  test('use productID to get banners', async () => {
    const res = await request(app).get('/api/bannersImage/product/345'); 
    expect(res.statusCode).toEqual(200);
  });
  //login users tests - tiota
  // test('it should respond with an access token on successful login', async () => {
  //   const response = await request(app)
  //     .post('/users/auth/login')
  //     .send({
  //       email: 'test@example.com',
  //       password: 'password123',
  //     });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('accessToken');
  // });

  // test('it should respond with an error on invalid login credentials', async () => {
  //   const response = await request(app)
  //     .post('/users/auth/login')
  //     .send({
  //       email: 'invalid@example.com',
  //       password: 'invalidpassword',
  //     });

  //   expect(response.status).toBe(401);
  //   expect(response.body).toHaveProperty('error');
  // });
  // test('it should respond with success on valid user registration', async () => {
  //   const response = await request(app)
  //     .post('/users/register')
  //     .send({
  //       userdata: {
  //         // Provide valid user data for registration
  //       },
  //     });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('success');
  // });

  // test('it should respond with an error on invalid user registration', async () => {
  //   const response = await request(app)
  //     .post('/users/register')
  //     .send({
  //       userdata: {
  //         // Provide invalid user data for registration
  //       },
  //     });

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('error');
  // });
});

