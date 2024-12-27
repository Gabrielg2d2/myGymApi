import { AdapterZod } from "@/domain/adapters/validation/zod";
import { IDataRequest } from "../../../repository";

interface IAdapterValidationDataUserCreate {
  execute(body: IDataRequest): Promise<{
    isBodyValid: boolean;
    fieldErrors: Record<string, unknown>;
  }>;
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

  public async execute(body: IDataRequest) {
    const isBodyValid = this.registerBodySchema.safeParse(body);

    if (!isBodyValid.success) {
      return {
        isBodyValid: isBodyValid.success,
        fieldErrors: isBodyValid.error.formErrors.fieldErrors,
      };
    }

    return {
      isBodyValid: isBodyValid.success,
      fieldErrors: {},
    };
  }
}
