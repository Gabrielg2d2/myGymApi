import { ICreateUserUseCase } from "@/domain/users/use-cases/create-user";
import * as Yup from "yup";

export class AdapterValidationDataUserCreate {
  private readonly registerBodySchema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  });

  public async execute(body: ICreateUserUseCase) {
    try {
      await this.registerBodySchema.validate(body, { abortEarly: false });
      return true;
    } catch (error) {
      return false;
    }
  }
}
