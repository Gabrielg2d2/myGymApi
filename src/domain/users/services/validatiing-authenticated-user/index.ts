import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { IUserGlobal } from "@/domain/global/types/user";

interface IServiceValidatingAuthenticatedUser {
  execute(user: IUserGlobal | null, password: string): Promise<void>;
}

export class ServiceValidatingAuthenticatedUser
  implements IServiceValidatingAuthenticatedUser
{
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(user: IUserGlobal | null, password: string) {
    const customError = new CustomErrorGlobal({
      message: "Error: Credentials are invalid",
    });

    if (!user?.id) throw customError;

    const isPasswordValid = await this.adapter.bcryptjs.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) throw customError;
  }
}
