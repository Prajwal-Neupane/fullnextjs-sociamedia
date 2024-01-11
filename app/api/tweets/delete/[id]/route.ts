// import prisma from "@/prisma/client";
import prisma from "@/prisma/client";
import { connectDB } from "@/utils";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  params: { params: { id: string } }
) => {
  try {
    await connectDB();

    const tweet = await prisma.tweets.delete({
      where: { id: params.params.id },
    });
    await prisma.$disconnect();

    return NextResponse.json(tweet);
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
