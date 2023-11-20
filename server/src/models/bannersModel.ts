import mongoose from "mongoose";
import { bannerInterface } from "../types/interfaces/bannerInterface";

const bannerSchema = new mongoose.Schema<bannerInterface>({
    _id: { type: String, required: true },
    productID: { type: String, required: true },
    catogryID: { type: String, required: true },
    onClick: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      alt: { type: String, required: true }
    },
    size: { type: 'side'|'top'| 'all', required: true },
    kind: [{ type: String, enum: ['price', 'sale'] }],
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: String, required: true }
  });

const bannerModel = mongoose.model('banners',bannerSchema);

export default {bannerModel}