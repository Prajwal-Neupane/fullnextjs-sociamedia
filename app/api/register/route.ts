import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { connectDB } from "@/utils";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" });
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    prisma.$disconnect();

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Prisma query error:", error);
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
