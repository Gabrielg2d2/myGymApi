import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { describe, expect, test, vitest } from "vitest";
import { RepositoryUsers } from "../../repositories/repository";
import { RepositoryUserTest } from "../../repositories/repository-test";
import { GetProfileUseCase } from "./main";

describe("GetProfileUseCase", () => {
  test("should return a profile", async () => {
    const mockRepository =
      new RepositoryUserTest() as unknown as RepositoryUsers;
    const sut = new GetProfileUseCase(mockRepository);

    const result = await sut.execute({ userId: "123123123" });

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
        en: "User found successfully",
        pt: "Usuário encontrado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    });
  });

  test("should return an error if the user is not found", async () => {
    const mockRepository =
      new RepositoryUserTest() as unknown as RepositoryUsers;
    const sut = new GetProfileUseCase(mockRepository);

    const result = await sut.execute({ userId: "any_id" });

    expect(result).toEqual({
      data: null,
      message: {
        en: "User not found",
        pt: "Usuário não encontrado",
      },
      typeMessage: ITypeMessageGlobal.ERROR,
      statusCode: 404,
      error: null,
    });
  });

  test("should return an error in case of unexpected error", async () => {
    const mockRepositoryWithErrorService = {
      execute: vitest.fn().mockRejectedValue(new Error("any_error")),
    } as unknown as RepositoryUsers;

    const sut = new GetProfileUseCase(mockRepositoryWithErrorService);

    const result = await sut.execute({ userId: "any_id" });

    expect(result).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 500,
      error: expect.any(String),
    });
  });
});
