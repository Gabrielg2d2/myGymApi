import { describe, expect, test } from "vitest";
import { RepositoryCreateUser } from ".";
import { AdapterRepositoryCreateUser } from "../adapters/repository/create-user";

describe("RepositoryCreateUser", () => {
  describe("Success", () => {
    // deveria retornar um novo usuário
    test("should return a new user", async () => {
      const mockAdapter = {
        userFindUnique: () => null,
        userCreate: () => ({
          id: "123456",
          name: "John Doe",
          email: "jhon@gmail.com",
          password_hash: "12c1sa981c98asc13456",
          created_at: new Date(),
        }),
      } as unknown as AdapterRepositoryCreateUser;
      const repositoryCreateUser = new RepositoryCreateUser(mockAdapter);

      const newUser = await repositoryCreateUser.execute({
        name: "John Doe",
        email: "jhon@gmail.com",
        password: "123456",
      });

      expect(newUser).toEqual({
        id: "123456",
        name: "John Doe",
        email: "jhon@gmail.com",
        password_hash: "12c1sa981c98asc13456",
        created_at: expect.any(Date),
      });
    });
  });

  describe("Error", () => {
    // deveria retornar um erro caso o usuário já exista
    // deveria retornar um erro caso ocorra um erro inesperado
  });
});
