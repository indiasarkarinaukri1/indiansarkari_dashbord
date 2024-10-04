import connectToDB from "@/database";
import Paper from "@/model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentID = searchParams.get("id");
    console.log(`getCurrent ID: ${getCurrentID}`);

    if (!getCurrentID) {
      return NextResponse.json({
        success: false,
        message: "ID is required",
      });
    }

    const getDeleteCurrentID = await Paper.findByIdAndDelete(getCurrentID);

    if (getDeleteCurrentID) {
      return NextResponse.json({
        success: true,
        message: "Data is deleted",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No document found with the provided ID",
      });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
}
