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

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    return await hash(password, env.HASH_SALT);
  }
}
