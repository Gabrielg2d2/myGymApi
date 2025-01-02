import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export class AdapterPrisma {
  constructor(
    private readonly db = new PrismaClient({
      log:
        env.NODE_ENV === "development"
          ? ["query", "info", "warn", "error"]
          : ["warn", "error"],
    })
  ) {}

  get prisma() {
    return this.db;
  }
}
