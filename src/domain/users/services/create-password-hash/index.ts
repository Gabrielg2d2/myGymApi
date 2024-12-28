import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { env } from "@/env";

interface IServiceCreateHash {
  execute(password: string): Promise<string>;
}

export class ServiceCreatePasswordHash implements IServiceCreateHash {
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(password: string) {
    const error = new Error("Unexpect: Error creating password hash");

    if (!password) throw error;

    const passwordHash = await this.adapter.bcryptjs.hash(
      password,
      env.HASH_SALT
    );

    if (!passwordHash) throw error;

    if (passwordHash === password) throw error;

    return passwordHash;
  }
}
