import { ICreateUserUseCase } from "@/domain/users/use-cases/create-user";
import { z } from "zod";

export class AdapterValidationDataUser {
  private readonly registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  public async execute(body: ICreateUserUseCase) {
    const isBodyValid = this.registerBodySchema.safeParse(body);
    return isBodyValid.success;
  }
}
