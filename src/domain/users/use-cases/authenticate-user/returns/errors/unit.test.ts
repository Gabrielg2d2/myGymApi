import { describe, expect, test } from "vitest";
import { ErrorsAuthenticateUser } from ".";

describe("ErrorsAuthenticateUser", () => {
  test('should handle the error "Error: Credentials are invalid"', async () => {
    const sut = new ErrorsAuthenticateUser();

    const error = new Error("Error: Credentials are invalid");

    const result = await sut.execute(error);

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

  test('should handle the error "unknown"', async () => {
    const sut = new ErrorsAuthenticateUser();

    const error = new Error("Unknown error");

    const result = await sut.execute(error);

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
