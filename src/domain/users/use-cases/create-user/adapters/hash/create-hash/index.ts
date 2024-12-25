import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { env } from "@/env";

export class AdapterCreateHash {
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(password: string): Promise<string> {
    return await this.adapter.bcryptjs.hash(password, env.HASH_SALT);
  }
}
