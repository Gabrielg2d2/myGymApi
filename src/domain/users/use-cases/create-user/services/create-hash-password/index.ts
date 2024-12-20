import { env } from "@/env";
import { hash } from "bcryptjs";

export class ServiceCreateHashPassword {
  async execute(password: string): Promise<string> {
    return await hash(password, env.HASH_SAULT);
  }
}
