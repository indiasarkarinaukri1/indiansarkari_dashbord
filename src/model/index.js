import mongoose, { Schema } from "mongoose";

const paperSchema = new Schema(
  {
    postTitle: { type: String, required: true },
    category: { type: String, required: true },
    subject: { type: String, required: true },
    shortDescription: String,
    pdf: String,
    metaTitle: String,
    metaDescription: String,
    canonicalUrl: String,
    slug: { type: String, unique: true, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Paper = mongoose.models.Paper || mongoose.model("Paper", paperSchema);
export default Paper;
