import { describe, expect, test } from "vitest";
import { ErrorsCreateUser } from ".";

describe("ErrorsCreateUser", () => {
  describe("Error handled", () => {
    test("should handle the 'Error: Invalid content' error", async () => {
      const error = new Error("Error: Invalid content");
      const sut = new ErrorsCreateUser();
      const result = await sut.execute(error);

      expect(result).toEqual({
        data: null,
        message: {
          en: "Invalid content",
          pt: "Conteúdo inválido",
        },
        typeMessage: "error",
        statusCode: 400,
        error: error,
      });
    });

    test("should handle the 'Error: User already exists' error", async () => {
      const error = new Error("Error: User already exists");
      const sut = new ErrorsCreateUser();
      const result = await sut.execute(error);

      expect(result).toEqual({
        data: null,
        message: {
          en: "User already exists",
          pt: "Usuário já existe",
        },
        typeMessage: "error",
        statusCode: 409,
        error: error,
      });
    });
  });

  describe("Any error", () => {
    test("should handle unknown errors", async () => {
      const error = new Error("Unknown error");
      const sut = new ErrorsCreateUser();
      const result = await sut.execute(error);

      expect(result).toEqual({
        data: null,
        message: {
          en: "Service unavailable, try again later",
          pt: "Serviço indisponível, tente novamente mais tarde",
        },
        typeMessage: "fatal",
        statusCode: 500,
        error: "Unknown error",
      });
    });
  });
});
