import { describe, expect, test } from "vitest";
import { AuthenticateUserUseCase } from "./main";
import { RepositoryAuthenticateUser } from "./repository";
import { RepositoryTest } from "./repository/repository-test";

describe("AuthenticateUserUseCase", () => {
  test("should authenticate user", async () => {
    const mockRepository =
      new RepositoryTest() as unknown as RepositoryAuthenticateUser;
    const sut = new AuthenticateUserUseCase(mockRepository);

    const result = await sut.execute({
      email: "test@gmail.com",
      password: "123123",
    });

    expect(result).toEqual({
      data: {
        user: {
          id: expect.any(String),
          name: "Test",
          email: "test@gmail.com",
          password_hash: expect.any(String),
          created_at: expect.any(Date),
        },
      },
      message: {
        en: "User authenticated successfully",
        pt: "Usuário autenticado com sucesso",
      },
      typeMessage: "success",
      statusCode: 200,
      error: null,
    });
  });
});
