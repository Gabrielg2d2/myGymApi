import { RepositoryUser } from "@/domain/users/repositories/repository";
import { RepositoryUserTest } from "@/domain/users/repositories/repository-test";
import { describe, expect, test } from "vitest";
import { AuthenticateUserUseCase } from "./main";

describe("AuthenticateUserUseCase", () => {
  test("should authenticate user", async () => {
    const mockRepository =
      new RepositoryUserTest() as unknown as RepositoryUser;
    const sut = new AuthenticateUserUseCase(mockRepository);

    const result = await sut.execute({
      email: "test@gmail.com",
      password: "123456",
    });

    expect(result).toEqual({
      data: {
        user: {
          id: expect.any(String),
          name: "Test User",
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

  test("should return error if credentials are invalid", async () => {
    const mockRepository =
      new RepositoryUserTest() as unknown as RepositoryUser;
    const sut = new AuthenticateUserUseCase(mockRepository);

    const result = await sut.execute({
      email: "invalid@gmail.com",
      password: "invalidpassword",
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: "Credentials are invalid",
        pt: "Credenciais inválidas",
      },
      typeMessage: "error",
      statusCode: 401,
      error: null,
    });
  });

  test("should return error if repository throws", async () => {
    const mockRepository = {
      getUserByEmail: async () => {
        throw new Error("Server error");
      },
    } as unknown as RepositoryUser;
    const sut = new AuthenticateUserUseCase(mockRepository);

    const result = await sut.execute({
      email: "invalid@gmail.com",
      password: "invalidpassword",
    });

    expect(result).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: "fatal",
      statusCode: 500,
      error: null,
    });
  });
});
