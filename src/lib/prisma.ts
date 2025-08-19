import { PrismaClient } from "@prisma/client"

declare global {
  // Để tránh TypeScript tạo lại nhiều PrismaClient khi hot reload
  // Chỉ khai báo 1 lần trong global
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // log query ra console nếu cần debug
  })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
