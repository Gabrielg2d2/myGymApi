import { describe, expect, test } from "vitest";
import { ServiceValidationCreateUser } from ".";

describe("ServiceValidationCreateUser", async () => {
  test("should throw an error if the name is invalid", async () => {
    const name = "a";
    const email = "jhon@gmail.com";
    const password = "123456";

    const sut = new ServiceValidationCreateUser();

    await expect(sut.execute({ name, email, password })).rejects.toThrow(
      "Error: Invalid content"
    );
  });

  test("should throw an error if the email is invalid", async () => {
    const name = "jhon";
    const email = "jhon.com";
    const password = "123456";

    const sut = new ServiceValidationCreateUser();

    await expect(sut.execute({ name, email, password })).rejects.toThrow(
      "Error: Invalid content"
    );
  });

  test("should throw an error if the password is invalid", async () => {
    const name = "jhon";
    const email = "jhon.com";
    const password = "";

    const sut = new ServiceValidationCreateUser();

    await expect(sut.execute({ name, email, password })).rejects.toThrow(
      "Error: Invalid content"
    );
  });
});
