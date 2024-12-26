import { describe, expect, test } from "vitest";
import { ServiceValidationAuthenticateUser } from ".";

describe("ServiceValidationAuthenticateUser", () => {
  describe("Success", () => {
    // não deveria retornar nada em caso de erro
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

  //   describe("Error", () => {});
});
