import { env } from "@/env";
import { hash } from "bcryptjs";

interface IServiceCreateHashPassword {
  execute(password: string): Promise<string>;
}

export class ServiceCreateHashPassword implements IServiceCreateHashPassword {
  async execute(password: string) {
    return await hash(password, env.HASH_SAULT);
  }
}
