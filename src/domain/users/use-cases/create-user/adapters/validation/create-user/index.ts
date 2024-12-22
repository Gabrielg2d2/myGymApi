import { AdapterZod } from "@/domain/adapters/validation/zod";
import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { IDataRequest } from "../../../repository";

interface IAdapterValidationDataUserCreate {
  execute(body: IDataRequest): Promise<void>;
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
      throw new CustomErrorGlobal({
        message: "Error: Invalid content",
        details: isBodyValid.error.formErrors.fieldErrors,
      });
    }
  }
}
