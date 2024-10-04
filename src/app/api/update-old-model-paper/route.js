import connectToDB from "@/database";
import Paper from "@/model";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditModel = Joi.object({
  postTitle: Joi.string().required(),
  category: Joi.string().required(),
  subject: Joi.string().required(),
  shortDescription: Joi.string().allow("").optional(),
  pdf: Joi.string().allow("").optional(),
  metaTitle: Joi.string().allow("").optional(),
  metaDescription: Joi.string().allow("").optional(),
  canonicalUrl: Joi.string().allow("").optional(),
  slug: Joi.string().required(),
  createdAt: Joi.date().iso().allow("").optional(),
  createdBy: Joi.string().required(),
});

export const PUT = async (req) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getCurrentModelID = searchParams.get("id");
    console.log(`getCurrentModelID Is ${getCurrentModelID}`);

    if (!getCurrentModelID) {
      return NextResponse.json({
        success: false,
        message: "Model ID is required.",
      });
    }

    const {
      postTitle,
      category,
      subject,
      shortDescription,
      pdf,
      metaTitle,
      metaDescription,
      canonicalUrl,
      slug,
      createdAt,
      createdBy,
    } = await req.json();

    const { error } = EditModel.validate({
      postTitle,
      category,
      subject,
      shortDescription,
      pdf,
      metaTitle,
      metaDescription,
      canonicalUrl,
      slug,
      createdAt,
      createdBy,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updatedModel = await Paper.findByIdAndUpdate(
      getCurrentModelID,
      {
        postTitle,
        category,
        subject,
        shortDescription,
        pdf,
        metaTitle,
        metaDescription,
        canonicalUrl,
        slug,
        createdAt,
        createdBy,
      },
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return NextResponse.json({
        success: false,
        message: "Model not found or update failed.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Model updated successfully.",
      data: updatedModel,
    });
  } catch (error) {
    console.error("Error updating model:", error);
    return NextResponse.json({
      success: false,
      message: `Something went wrong! Please try again. ${error.details[0].message}`,
    });
  }
};
