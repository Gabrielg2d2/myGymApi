import { describe, expect, test, vitest } from "vitest";
import { RepositoryAuthenticateUser } from ".";
import { AdapterRepositoryAuthenticateUser } from "../adapters/repository/find-user-by-email";

describe("RepositoryAuthenticateUser", () => {
  describe("Success", () => {
    test("should return a user", async () => {
      const mockAdapter = {
        findUserByEmail: vitest.fn().mockResolvedValue({
          id: new Date().getTime().toString(),
          name: "Test",
          email: "test@gmail",
          password_hash: new Date().getTime().toString(),
          created_at: new Date(),
        }),
      } as unknown as AdapterRepositoryAuthenticateUser;

      const repositoryAuthenticateUser = new RepositoryAuthenticateUser(
        mockAdapter
      );
      const data = {
        email: "test@gmail.com",
        password: "123456",
      };

      const user = await repositoryAuthenticateUser.execute(data);

      expect(user).not.toBeNull();
    });
  });

  describe("Error", () => {
    test("should return null", async () => {
      const mockAdapter = {
        findUserByEmail: vitest.fn().mockResolvedValue(null),
      } as unknown as AdapterRepositoryAuthenticateUser;

      const repositoryAuthenticateUser = new RepositoryAuthenticateUser(
        mockAdapter
      );
      const data = {
        email: "test@gmail.com",
        password: "123456",
      };

      const user = await repositoryAuthenticateUser.execute(data);

      expect(user).toBeNull();
    });
  });
});
