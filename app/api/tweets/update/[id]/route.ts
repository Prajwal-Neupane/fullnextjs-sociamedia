import prisma from "@/prisma/client";
import { connectDB } from "@/utils";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { tweet } = await req.json();
    await connectDB();
    const updateTweet = await prisma.tweets.update({
      data: { tweet },
      where: { id: params.id },
    });
    return NextResponse.json({ updateTweet });
  } catch (error: any) {
    return NextResponse.json(
      {
        Error: "Error creating tweets.",
        PrismaError: {
          code: error.code,
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
};
