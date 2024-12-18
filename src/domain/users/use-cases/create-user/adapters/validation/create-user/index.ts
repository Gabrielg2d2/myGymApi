import { AdapterZod } from "@/domain/adapters/validation/zod";
import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { ICreateUserUseCase } from "@/domain/users/use-cases/create-user";

interface IAdapterValidationDataUserCreate {
  execute(body: ICreateUserUseCase): Promise<void>;
}

export class AdapterValidationCreateUser
  implements IAdapterValidationDataUserCreate
{
  constructor(private readonly adapterValidation = new AdapterZod()) {}

  private readonly registerBodySchema = this.adapterValidation.zod.object({
    name: this.adapterValidation.zod.string().min(3),
    email: this.adapterValidation.zod.string().email(),
    password: this.adapterValidation.zod.string().min(6),
  });

  public async execute(body: ICreateUserUseCase) {
    const isBodyValid = this.registerBodySchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new CustomErrorGlobal(
        "Error: Invalid content",
        isBodyValid.error.formErrors.fieldErrors
      );
    }
  }
}
