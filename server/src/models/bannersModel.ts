import mongoose from "mongoose";
import { BannerInterface } from "../types/interfaces/BannerInterface";


const bannerSchema = new mongoose.Schema<BannerInterface>({
  _id: { type: String, required: true },
  productID: { type: String, required: true },
  catogryID: { type: String, required: true },
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
});

const bannerModel = mongoose.model('Banner', bannerSchema);

export {
  bannerModel,
  insertBanners,
}





async function insertBanners() {
  const banners: BannerInterface[] = [
    {
      _id: "1",
      productID: "123",
      catogryID: "456",
      clickCount: 0,
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
      catogryID: "789",
      clickCount: 0,
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
      catogryID: "012",
      clickCount: 0,
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
      catogryID: "345",
      clickCount: 0,
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
      catogryID: "678",
      clickCount: 0,
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