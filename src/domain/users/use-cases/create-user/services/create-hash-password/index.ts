import { AdapterCreateHash } from "../../adapters/hash/create-hash";

interface IServiceCreateHashPassword {
  execute(password: string): Promise<string>;
}

export class ServiceCreateHashPassword implements IServiceCreateHashPassword {
  async execute(password: string) {
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    return await new AdapterCreateHash().execute(password);
  }
}
