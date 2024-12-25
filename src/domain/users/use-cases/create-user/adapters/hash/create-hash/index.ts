import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { env } from "@/env";

interface IAdapterCreateHash {
  execute(password: string): Promise<string>;
}

export class AdapterCreateHash implements IAdapterCreateHash {
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(password: string): Promise<string> {
    return await this.adapter.bcryptjs.hash(password, env.HASH_SALT);
  }
}
