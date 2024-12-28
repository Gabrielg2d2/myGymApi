import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";

interface IServiceValidationEmailPassword {
  execute(email: string, password: string): Promise<void>;
}

export class ServiceValidationEmailPassword
  implements IServiceValidationEmailPassword
{
  async execute(email: string, password: string) {
    if (!email || !password)
      throw new CustomErrorGlobal({
        message: "Error: Invalid content",
      });
  }
}
