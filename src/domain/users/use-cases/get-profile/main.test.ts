import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { describe, expect, test } from "vitest";
import { GetProfileUseCase } from "./main";

describe("GetProfileUseCase", () => {
  test("should return a profile", async () => {
    const sut = new GetProfileUseCase();

    const result = await sut.execute("987654321");

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
    const sut = new GetProfileUseCase();

    const result = await sut.execute("any_id");

    expect(result).toEqual({
      data: null,
      message: {
        en: "User not found",
        pt: "Usuário não encontrado",
      },
      typeMessage: ITypeMessageGlobal.ERROR,
      statusCode: 404,
      error: expect.any(Error),
    });
  });

  test("should return an error in case of unexpected error", async () => {
    const sut = new GetProfileUseCase();

    const result = await sut.execute("any_id");

    expect(result).toEqual({
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 501,
      error: expect.any(Error),
    });
  });
});
