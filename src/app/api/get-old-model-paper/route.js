import connectToDB from "@/database";
import Paper from "@/model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const extractAllDataFromDatabse = await Paper.find({});
    if (extractAllDataFromDatabse) {
      return NextResponse.json({
        success: true,
        data: extractAllDataFromDatabse,
      });
    } else {
      return {
        success: false,
        message: "something went wrong please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong please try again",
    };
  }
}
