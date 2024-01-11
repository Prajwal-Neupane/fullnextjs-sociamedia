import { connectDB } from "@/utils";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const tweets = await prisma.tweets.findMany();
    return NextResponse.json(tweets, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        Error: "Something error occured while getting all the tweets",
      },
      { status: 500 }
    );
  } finally {
    await prisma?.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    const { tweet, userId } = await req.json();
    if (!tweet || !userId) {
      return NextResponse.json({ message: "All fields are required" });
    }
    await connectDB();
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    const tweets = await prisma.tweets.create({ data: { tweet, userId } });
    await prisma.$disconnect();
    return NextResponse.json({ tweets }, { status: 200 });
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
