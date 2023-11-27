import { app } from "../server";
// import { request } from "supertest";
import request from "supertest";

// that test pass
 describe('GET api/bannersImage',()=>{
 test("get all banners", async () => {
    const res = await  request(app).get("/api/bannersImage");
    expect(res.statusCode).toEqual(200);
  });
});

// describe('test get banner by product id', ()=>{
//   test('use productID to get banners', async () => {
//     const res = await  request(app).get('api/bannersImage/product/345'); 
//     expect(res.statusCode).toEqual(200);
//   });
// });
  
//   describe('GET /bannersImage/category/:categoryName', () => {
//     test('it should respond with an array of banners for a specific category', async () => {
//       const response = await  request(app)
//         .get('/bannersImage/category/:categoryName'); // add category name
  
//       expect(response.status).toBe(200);
//     });
//   });
  
//   describe('GET /bannersImage/user/:userID', () => {
//     test('it should respond with an array of banners created by a specific user', async () => {
//       const response = await  request(app)
//         .get('/bannersImage/user/:userID'); // add user ID
  
//       expect(response.status).toBe(200);
//     });
//   });
  
//   describe('PUT /bannersImage/:bannerID', () => {
//     test('it should respond with success on updating a banner', async () => {
//       const response = await request(app)
//         .put('/bannersImage/:bannerID') // add banner ID
//         .send({
//           banner: {
//             // add banner data
//           },
//         });
  
//       expect(response.status).toBe(200);
//     });
//   });
  
//   describe('POST /bannersImage/:productID', () => {
//     test('it should respond with success on creating a  ranner for a product', async () => {
//       const response = await request(app)
//         .post('/bannersImage/productID') // add product ID
//         .send({
//           banner: {
//             //add banner data
//           },
//         });
  
//       expect(response.status).toBe(200);
//     });
//   });
  
//   describe('DELETE /bannersImage/:bannerID', () => {
//     test('it should respond with success on deleting a banner', async () => {
//       const response = await  request(app)
//         .delete(); // add url
  
//       expect(response.status).toBe(200);
//     });
//   });