import { env } from "@/env";
import { hash } from "bcryptjs";

export class AdapterCreateHash {
  async execute(password: string): Promise<string> {
    return await hash(password, env.HASH_SALT);
  }
}
