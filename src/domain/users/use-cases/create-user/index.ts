import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { hash } from "bcryptjs";
import { z } from "zod";
import { RepositoryCreateUser } from "./repository";

export type ICreateUserUseCase =
  | {
      name: string;
      email: string;
      password: string;
    }
  | unknown;
export class CreateUserUseCase {
  constructor(
    private readonly repositoryCreateUser = new RepositoryCreateUser()
  ) {}

  async execute(body: ICreateUserUseCase) {
    const registerBodySchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const isBodyValid = registerBodySchema.safeParse(body);

    if (!isBodyValid.success) {
      const dataDefault = {
        data: null,
        message: {
          en: "Invalid content",
          pt: "Conteúdo inválido",
        },
        typeMessage: ITypeMessageGlobal.ERROR,
        statusCode: 400,
      };

      return dataDefault;
    }

    const { name, email, password } = isBodyValid.data;

    const password_hash = await hash(password, 6);

    return await this.repositoryCreateUser.execute({
      name,
      email,
      password_hash,
    });
  }
}
