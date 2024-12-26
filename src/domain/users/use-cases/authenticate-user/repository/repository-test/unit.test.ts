import { describe, expect, test } from "vitest";
import { RepositoryTest } from ".";

describe("RepositoryTest", () => {
  describe("Success", () => {
    test("should return user", async () => {
      const sut = new RepositoryTest();

      const userData = {
        email: "test@gmail",
        password: "123123",
      };

      const user = await sut.execute(userData);

      expect(user).not.toBeNull();
    });
  });

  describe("Error", () => {
    test("should return null", async () => {
      const sut = new RepositoryTest();

      const userData = {
        email: "test2@gmail",
        password: "123123",
      };

      const user = await sut.execute(userData);

      expect(user).toBeNull();
    });
  });
});
