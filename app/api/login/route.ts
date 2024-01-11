import prisma from "@/prisma/client";
import { connectDB } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 422 }
      );
    }
    await connectDB();
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const passwordValidation = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordValidation) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }
    return NextResponse.json({ message: "user logged In" }, { status: 200 });
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
