import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { beforeEach, describe, expect, test, vitest } from "vitest";
import { RepositoryUsers } from "../../repositories/repository";
import { RepositoryUserTest } from "../../repositories/repository-test";
import { GetProfileUseCase } from "./main";

class makeSutGetProfileUseCase {
  static execute(isError = false) {
    if (isError) {
      const repositoryTest = {
        execute: vitest
          .fn()
          .mockRejectedValueOnce(new Error("Error: unknown error")),
      } as unknown as RepositoryUsers;
      return new GetProfileUseCase(repositoryTest);
    }

    const repositoryTest =
      new RepositoryUserTest() as unknown as RepositoryUsers;
    return new GetProfileUseCase(repositoryTest);
  }
}

describe("GetProfileUseCase", () => {
  let sut: GetProfileUseCase;

  beforeEach(() => {
    sut = makeSutGetProfileUseCase.execute();
  });

  test("should return a profile", async () => {
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
    const sutWithError = makeSutGetProfileUseCase.execute(true);

    const result = await sutWithError.execute({ userId: "any_id" });

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
