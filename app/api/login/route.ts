import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
  } catch (error: any) {
    return NextResponse.json(
      {
        Error: "Error creating user.",
        PrismaError: {
          code: error.code,
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
};
