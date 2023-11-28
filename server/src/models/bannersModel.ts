import mongoose from "mongoose";
import { BannerInterface } from "../types/interfaces/bannerInterface";


const bannerSchema = new mongoose.Schema<BannerInterface>({
  name: { type: String, required: true },
  productID: { type: String, required: true },
  catogryName: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  image: {
    url: { type: String, required: true },
    alt: { type: String, required: true }
  },
  size: { type: String, enum: ['side', 'top', 'all'], required: true },
  kind: [{ type: String, enum: ['price', 'sale'], required: true }],
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, required: true }
}, {
  timestamps: true,
});

const bannerModel = mongoose.model('Banner', bannerSchema);

export { bannerModel }





export async function insertBanners() {

  const banners: BannerInterface[] = [

    {
      productID: "123",
      catogryName: "456",
      clickCount: 0,
      name: "Banner 1",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rBbw6FThUHGkWfi5_JGe0NpqN3p2XS2Rhw&usqp=CAU",
        alt: "Banner 1"
      },
      size: "side",
      kind: ["price"],
      text: "Special Sale!",
      createdAt: new Date(),
      author: "Admin"
    },
    {

      productID: "456",
      catogryName: "789",
      clickCount: 0,
      name: "Banner 2",
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4r5PwaOdp97FiCsbmhHThLusqv_vd9kWwRg&usqp=CAU",
        alt: "Banner 2"
      },
      size: "top",
      kind: ["sale"],
      text: "Limited Time Offer!",
      createdAt: new Date(),
      author: "Admin"
    },
    {

      productID: "789",
      catogryName: "012",
      clickCount: 0,
      name: "Banner 3",
      image: {
        url: "https://www.tapet3d.co.il/files/products/product23_image1_2021-03-29_11-25-56.jpg",
        alt: "Banner 3"
      },
      size: "all",
      kind: ["price", "sale"],
      text: "New Arrivals!",
      createdAt: new Date(),
      author: "Admin"
    },
    {

      productID: "012",
      catogryName: "345",
      clickCount: 0,
      name: "Banner 4", // שם המוצר כאן
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf5x5SoebRbIFuWZbuivoTVfAign9O9Iee0Q&usqp=CAU",
        alt: "Banner 4"
      },
      size: "side",
      kind: ["price"],
      text: "Clearance Sale!",
      createdAt: new Date(),
      author: "Admin"
    },
    {
      productID: "345",
      catogryName: "678",
      clickCount: 0,
      name: "Banner 5", // שם המוצר כאן
      image: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZKsULxS0Tdi9pG2_0--uQ-c46OnV8xaFxw&usqp=CAU",
        alt: "Banner 5"
      },
      size: "top",
      kind: ["sale"],
      text: "Flash Sale!",
      createdAt: new Date(),
      author: "Admin"
    }
  ];

  try {
    const result = await bannerModel.insertMany(banners);
    console.log(`${result.length} banners inserted successfully.`);
  } catch (error) {
    console.error("Error inserting banners:", error);
  }
}