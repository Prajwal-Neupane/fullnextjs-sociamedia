import { connectDB } from "@/utils";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const user = await prisma.user.findMany({
      include: { tweets: true, _count: true },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        Error: "Something error occured while getting all the users",
      },
      { status: 500 }
    );
  } finally {
    await prisma?.$disconnect();
  }
};
