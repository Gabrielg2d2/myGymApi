import { describe, expect, test } from "vitest";
import { ErrorsAuthenticateUser } from ".";

describe("ErrorsAuthenticateUser", () => {
  test('should return a message in english and portuguese when the error message is "Error: Credentials are invalid"', async () => {
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
});
