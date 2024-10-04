import connectToDB from "@/database";
import Paper from "@/model";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewpaper = Joi.object({
  postTitle: Joi.string().required(),
  category: Joi.string().required(),
  subject: Joi.string().required(),
  shortDescription: Joi.string().allow("").optional(),
  pdf: Joi.string().allow("").optional(),
  metaTitle: Joi.string().allow("").optional(),
  metaDescription: Joi.string().allow("").optional(),
  canonicalUrl: Joi.string().allow("").optional(),
  slug: Joi.string().required(),
  createdAt: Joi.string().allow("").optional(),
  createdBy: Joi.string().required(),
});

export async function POST(req) {
  try {
    const extractPaper = await req.json();

    const { error } = AddNewpaper.validate(extractPaper);
    if (error) {
      console.error("Validation Error:", error.details);
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const newlyCreatedPaperItem = await Paper.create(extractPaper);

    return NextResponse.json(
      {
        success: true,
        message: "Data added successfully",
        data: newlyCreatedPaperItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add the paper",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
