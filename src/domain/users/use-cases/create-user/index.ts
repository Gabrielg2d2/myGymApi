import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { hash } from "bcryptjs";
import { RepositoryCreateUser } from "./repository";
import { ServiceValidationCreateUser } from "./services/validation-create-user";

export type ICreateUserUseCase = {
  name: string;
  email: string;
  password: string;
};
export class CreateUserUseCase {
  constructor(
    private readonly repositoryCreateUser = new RepositoryCreateUser()
  ) {}

  async execute(body: ICreateUserUseCase) {
    const isBodyValid = await new ServiceValidationCreateUser().execute(body);

    if (!isBodyValid) {
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

    const { name, email, password } = body;

    const password_hash = await hash(password, 6);

    return await this.repositoryCreateUser.execute({
      name,
      email,
      password_hash,
    });
  }
}
