import request from "supertest";
// import { app } from "../server";

import { describe, expect, test } from '@jest/globals';
import { config } from "dotenv";
// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
import { insertBanners } from "../models/bannersModel";
import connectToDB from "../configs/mongoDBConnect";


// beforeAll(async () => {
//   // console.log("Connecting to MongoDB Memory Server");
//   // let mongoMemoryServer: MongoMemoryServer;
//   // mongoMemoryServer = await MongoMemoryServer.create();
//   // const dbUri = mongoMemoryServer.getUri();
//   // const port = parseInt(dbUri.split(':')[2].split('/')[0]);
//   // await mongoose.connect(dbUri)
//   // console.log('Connected to mongoMemoryServer on port', port);
//   await insertBanners()
//   console.log('Insert Banners Done');
// })

// afterAll(() => {
//   mongoose.connection.close();
//   console.log('Disconnected from mongodb');
// })

beforeAll(async() => {
  config();
  await connectToDB();
  await insertBanners();
})

const server = process.env.TEST_SERVER_URI || "http://localhost:5000";

describe("GET /bannersImage/", () => {
  test("should return all bannersImage", async () => {
    const response = await request(server).get("/bannersImage/");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);    
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe("GET /bannersImage/:productID", () => {
  test("should return bannersImage by productID", async () => {
    const productID = "456";
    const response = (await request(server).get(`/bannersImage/product/${productID}`));
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  },10000);
});

describe("GET /bannersImage/category/:categoryName", () => {
  test("should return bannersImage by category", async () => {
    const categoryName = "456";
    const response = await request(server).get(`/bannersImage/category/${categoryName}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe("GET /bannersImage/user/:userID", () => {
  test("should return bannersImage by user", async () => {
    const userID = "Admin";
    const response = await request(server).get(`/bannersImage/user/${userID}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
  },10000);
});

describe("PUT /bannersImage/:bannerID", () => {
  test("should update bannerImage by bannerID", async () => {
    const res = await request(server).get("/bannersImage/");
    const bannerID = res.body.data[Math.floor(Math.random() * res.body.data.length)]._id
    const updatedBanner = {
      title: "New Title",
      description: "New Description",
      imageUrl: "newImageUrl",
    };
    const response = await request(server).put(`/bannersImage/${bannerID}`).send(updatedBanner);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

// describe("POST /bannersImage/:productID", () => {
//   test("should create bannerImage by productID", async () => {
//     const productID = "1234567890";
//     const newBanner = {
//       name: "Cyber Monday Sale",
//       productID: "09876",
//       catogryID: "09876",
//       clickCount: 123,
//       image: {
//         url: "https://example.com/cyber-monday.jpg",
//         alt: "Cyber Monday"
//       },
//       size: "side",
//       kind: [
//         "sale"
//       ],
//       text: "Don't miss out on our Cyber Monday deals!",
//       createdAt: "2023-11-26T10:36:00Z",
//       author: "David Brown"
//     };
//     const response = await request(app).post(`/bannersImage/${productID}`).send(newBanner);
//     expect(response.status).toBe(201);
//     expect(response.body.success).toBe(true);
//     expect(response.body.data).toEqual(newBanner);
//   });
// });

// describe("DELETE /bannersImage/:bannerID", () => {
//   test("should delete bannerImage by bannerID", async () => {
//     const bannerID = "6566682341ec4afc00c859fe";
//     const response = await request(app).delete(`/bannersImage/${bannerID}`);
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.data).toEqual(bannerID);
//   });
// });
