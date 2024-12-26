import { describe, expect, it } from "vitest";
import { RepositoryTest } from ".";

describe("RepositoryTest", () => {
  describe("Success", () => {
    it("should return user", async () => {
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
    it("should return null", async () => {
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
