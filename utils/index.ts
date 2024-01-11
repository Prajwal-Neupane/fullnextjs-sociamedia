import prisma from "@/prisma/client";

export const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return new Error("Connection Error");
  }
};
