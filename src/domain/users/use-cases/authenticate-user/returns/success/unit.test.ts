import { describe, expect, test } from "vitest";
import { IDataSuccess, SuccessAuthenticateUser } from ".";

describe("SuccessAuthenticateUser", () => {
  describe("Success", () => {
    test("Should return success when user is authenticated", () => {
      const sut = new SuccessAuthenticateUser();

      const data: IDataSuccess = {
        user: {
          id: new Date().getTime().toString(),
          name: "Test User",
          email: "test@gmail.com",
          created_at: new Date(),
          password_hash: "any_password_hash",
        },
      };

      const response = sut.execute(data);

      expect(response).toEqual({
        data: {
          user: {
            id: expect.any(String),
            name: "Test User",
            email: "test@gmail.com",
            created_at: expect.any(Date),
            password_hash: "any_password_hash",
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

  describe("Error", () => {
    test("Should return error when user is not authenticated", () => {});
  });
});
