import { describe, expect, test } from "vitest";
import { ErrorsAuthenticateUser } from ".";

describe("ErrorsAuthenticateUser", () => {
  describe("Error handled", () => {
    test("should handle the 'Error: User not found' error", async () => {
      const error = new Error("Error: User not found");
      const result = await new ErrorsAuthenticateUser().execute(error);

      expect(result).toEqual({
        data: null,
        message: {
          en: "User not found",
          pt: "Usuário não encontrado",
        },
        typeMessage: "error",
        statusCode: 404,
        error: error,
      });
    });
  });

  describe("Any error", () => {
    test("should handle unknown errors", async () => {
      const error = new Error("Unknown error");
      const result = await new ErrorsAuthenticateUser().execute(error);

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
