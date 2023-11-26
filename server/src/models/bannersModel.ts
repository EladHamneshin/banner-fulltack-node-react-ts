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
      _id: "1",
      productID: "123",
      catogryName: "456",
      clickCount: 0,
      name: "Banner 1",
      image: {
        url: "https://example.com/image1.jpg",
        alt: "Banner 1"
      },
      size: "side",
      kind: ["price"],
      text: "Special Sale!",
      createdAt: new Date(),
      author: "Admin"
    },
    {
      _id: "2",
      productID: "456",
      catogryName: "789",
      clickCount: 0,
      name: "Banner 2",
      image: {
        url: "https://example.com/image2.jpg",
        alt: "Banner 2"
      },
      size: "top",
      kind: ["sale"],
      text: "Limited Time Offer!",
      createdAt: new Date(),
      author: "Admin"
    },
    {
      _id: "3",
      productID: "789",
      catogryName: "012",
      clickCount: 0,
      name: "Banner 3",
      image: {
        url: "https://example.com/image3.jpg",
        alt: "Banner 3"
      },
      size: "all",
      kind: ["price", "sale"],
      text: "New Arrivals!",
      createdAt: new Date(),
      author: "Admin"
    },
    {
      _id: "4",
      productID: "012",
      catogryName: "345",
      clickCount: 0,
      name: "Banner 4", // שם המוצר כאן
      image: {
        url: "https://example.com/image4.jpg",
        alt: "Banner 4"
      },
      size: "side",
      kind: ["price"],
      text: "Clearance Sale!",
      createdAt: new Date(),
      author: "Admin"
    },
    {
      _id: "5",
      productID: "345",
      catogryName: "678",
      clickCount: 0,
      name: "Banner 5", // שם המוצר כאן
      image: {
        url: "https://example.com/image5.jpg",
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