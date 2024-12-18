import { AdapterZod } from "@/domain/adapters/validation/zod";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { ICreateUserUseCase } from "@/domain/users/use-cases/create-user";

interface IAdapterValidationDataUserCreate {
  execute(body: ICreateUserUseCase): void;
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
      const dataDefault = {
        data: null,
        message: {
          en: "Invalid content",
          pt: "Conteúdo inválido",
        },
        typeMessage: ITypeMessageGlobal.ERROR,
        statusCode: 400,
        error: isBodyValid.success
          ? undefined
          : isBodyValid.error?.formErrors.fieldErrors,
      };

      throw dataDefault;
    }
  }
}
