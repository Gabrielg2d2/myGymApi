import { describe, expect, test } from "vitest";
import { ServiceValidationCreateUser } from ".";

describe("ServiceValidationCreateUser", async () => {
  test("should throw an error if the name is invalid", async () => {
    const name = "a";
    const email = "jhon@gmail.com";
    const password = "123456";

    const service = new ServiceValidationCreateUser();

    await expect(service.execute({ name, email, password })).rejects.toThrow(
      "Error: Invalid content"
    );
  });

  test("should throw an error if the email is invalid", async () => {});
  test("should throw an error if the password is invalid", async () => {});
});
