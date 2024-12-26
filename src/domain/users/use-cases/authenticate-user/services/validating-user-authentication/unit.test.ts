import { describe, expect, test } from "vitest";
import { ServiceValidationAuthenticateUser } from ".";

describe("ServiceValidationAuthenticateUser", () => {
  describe("Success", () => {
    test("should return nothing if user is valid", async () => {
      const sut = new ServiceValidationAuthenticateUser();
      const user = {
        email: "jhon@gmail.com",
        password: "123456",
      };

      const result = await sut.execute(user);
      expect(result).toBeUndefined();
    });
  });

  describe("Error", () => {
    // deveria retornar um erro, caso o email não seja informado
    test("should return an error if email is not provided", async () => {
      const sut = new ServiceValidationAuthenticateUser();
      const user = {
        email: "",
        password: "123456",
      };

      try {
        await sut.execute(user);
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe("Error: Credentials are invalid");
        }
      }
    });

    // deveria retornar um erro, caso o password não seja informado
    test("should return an error if password is not provided", async () => {});

    // deveria retornar um erro, caso o password ou email seja inválido
    test("should return an error if password or email is invalid", async () => {});
  });
});
