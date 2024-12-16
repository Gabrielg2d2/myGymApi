import { PrismaAdapter } from "@/domain/adapters/prisma";

export class AdapterRepository {
  constructor(private readonly _db = new PrismaAdapter()) {}

  get db() {
    return this._db;
  }
}
