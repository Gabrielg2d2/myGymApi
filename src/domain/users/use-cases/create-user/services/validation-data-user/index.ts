import { z } from "zod";
import { ICreateUserUseCase } from "../..";

// class AdapterValidationDataUser {
//   private readonly registerBodySchema = z.object({
//     name: z.string().min(3),
//     email: z.string().email(),
//     password: z.string().min(6),
//   });

//   public async execute(body: ICreateUserUseCase) {
//     const isBodyValid = this.registerBodySchema.safeParse(body);
//     return isBodyValid.success;
//   }
// }

export class ServiceValidationDataUser {
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
