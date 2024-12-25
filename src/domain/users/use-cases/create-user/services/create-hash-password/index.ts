import { env } from "@/env";
import { hash } from "bcryptjs";

interface IServiceCreateHashPassword {
  execute(password: string): Promise<string>;
}

export class ServiceCreateHashPassword implements IServiceCreateHashPassword {
  async execute(password: string) {
    if (!password) {
      throw new Error("Password is required");
    }
    return await hash(password, env.HASH_SALT);
  }
}
