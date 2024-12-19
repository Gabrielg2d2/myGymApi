import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataCreate } from "@/repositories/users-repository/interface";
import { ErrorsCreateUser } from "./errors";
import { RepositoryCreateUser } from "./repository";
import { ServiceCreateHashPassword } from "./services/create-hash-password";
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

  async execute(
    body: ICreateUserUseCase
  ): Promise<IReturnDefaultDomain<IDataCreate | null>> {
    try {
      await new ServiceValidationCreateUser().execute(body);

      const { name, email, password } = body;

      const password_hash = await new ServiceCreateHashPassword().execute(
        password
      );

      const result = await this.repositoryCreateUser.execute({
        name,
        email,
        password_hash,
      });

      return {
        data: result,
        message: {
          en: "User created successfully",
          pt: "Usuário criado com sucesso",
        },
        statusCode: 201,
        typeMessage: ITypeMessageGlobal.SUCCESS,
        error: null,
      };
    } catch (error) {
      return await new ErrorsCreateUser().execute(error);
    }
  }
}
