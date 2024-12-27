import { RepositoryGetProfileUseCase } from "./repository";

export class GetProfileUseCase {
  constructor(
    private readonly repository = new RepositoryGetProfileUseCase()
  ) {}

  async execute(userId: string) {
    try {
      const user = await this.repository.execute(userId);

      if (!user) {
        return {
          data: null,
          message: {
            en: "User not found",
            pt: "Usuário não encontrado",
          },
          typeMessage: "error",
          statusCode: 404,
          error: null,
        };
      }

      return {
        data: {
          user,
        },
        message: {
          en: "User found successfully",
          pt: "Usuário encontrado com sucesso",
        },
        typeMessage: "success",
        statusCode: 200,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        message: {
          en: "Service unavailable, try again later",
          pt: "Serviço indisponível, tente novamente mais tarde",
        },
        typeMessage: "fatal",
        statusCode: 500,
        error,
      };
    }
  }
}
