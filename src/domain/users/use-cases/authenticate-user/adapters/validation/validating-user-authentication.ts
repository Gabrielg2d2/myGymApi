import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { env } from "@/env";
import { IDataRequest } from "../../repository";

interface IValidatingUserAuthentication {
  execute(data: IDataRequest): Promise<void>;
}

export class ValidatingUserAuthentication
  implements IValidatingUserAuthentication
{
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(data: IDataRequest) {
    const customErrorGlobal = new CustomErrorGlobal({
      message: "Error: Credentials are invalid",
    });

    const { password } = data;

    if (!data.email || !data.password) {
      throw customErrorGlobal;
    }

    const passwordHash = await this.adapter.bcryptjs.hash(
      password,
      env.HASH_SALT
    );

    const isPasswordValid = this.adapter.bcryptjs.compare(
      password,
      passwordHash
    );

    if (!isPasswordValid) throw customErrorGlobal;
  }
}
