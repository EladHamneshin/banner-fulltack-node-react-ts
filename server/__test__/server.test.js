"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
describe("Test that the banners displays", () => {
    test("use banners and get 200 status", async () => {
        const res = await (0, supertest_1.default)(server_1.app).get("/api/banners");
        expect(res.status).toEqual(200);
    });
});
